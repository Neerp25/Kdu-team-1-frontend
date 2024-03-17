import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { setAdults, setTotalGuests } from '../../redux/reducers/landingPageReducer';
import { GuestType } from '../../utils/enums';
import toast, { Toaster } from 'react-hot-toast';


const NumberOfGuests: React.FC = () => {
  const adults = useSelector((state: RootState) => state.landingPage.adults);
  const totalGuests = useSelector((state: RootState) => state.landingPage.totalGuests);
  const numberOfRooms = useSelector((state: RootState) => state.landingPage.numberOfRooms);

  const [teens, setTeens] = useState(0);
  const [kids, setKids] = useState(0);
  const [selectOpen, setSelectOpen] = useState(false);

  const hotelProperty = useSelector((state: RootState) => state.propertyConfig.property);

  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  const handleGuestTypeChange = () => {
    return;
  };

  const handleGuestCountChange = (type: string, change: number): void => {
    const newTotal = totalGuests + change;
    if (newTotal > hotelProperty.maxGuests + 1) {
      toast.error(`Max guests allowed are ${hotelProperty.maxGuests + 1}`)
    }

    if (newTotal <= hotelProperty.maxGuests + 1) {
      switch (type) {
        case GuestType.adult:
          dispatch(setAdults(Math.max(0, adults + change)))
          if (Math.max(0, adults + change) < numberOfRooms) {
            toast.error("Adults can't be less than rooms")
            break;
          }
          dispatch(setTotalGuests(newTotal <= 0 ? 1 : newTotal))
          break;
        case GuestType.teen:
          setTeens(prev => Math.max(0, prev + change));
          if (Math.max(0, teens + change) < 0) break;
          dispatch(setTotalGuests(newTotal <= 0 ? 1 : newTotal))
          break;
        case GuestType.kids:
          setKids(prev => Math.max(0, prev + change));
          if (Math.max(0, kids + change) < 0) break;
          dispatch(setTotalGuests(newTotal <= 0 ? 1 : newTotal))
          break;
        default:
          break;
      }
    }
  };

  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const handleSelectClose = (event: React.SyntheticEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      event.preventDefault();
    } else {
      setSelectOpen(false);
    }
  };

  return (
    <Box sx={{ marginBottom: 2, marginRight: 1 }}>
      <Toaster />
      <FormControl fullWidth>
        <InputLabel id="guest-type-label">{i18n.t("landingPageForm.guestType")}</InputLabel>
        <Select
          labelId="guest-type-label"
          id="guest-type"
          value={totalGuests.toString()}
          onChange={handleGuestTypeChange}
          label={i18n.t("landingPageForm.guestType")}
          open={selectOpen}
          onOpen={handleSelectOpen}
          onClose={handleSelectClose}
          renderValue={(value) => `Guests: ${value}`}
        >
          {hotelProperty.guests.adults && (
            <MenuItem disableRipple value={GuestType.adult}>
              {i18n.t("landingPageForm.adult")}<br></br> ({i18n.t("landingPageForm.age")} 18+)
              <div style={{ marginLeft: '20px' }}>
                <Button onClick={() => handleGuestCountChange(GuestType.adult, -1)}>-</Button>
                {adults}
                <Button onClick={() => handleGuestCountChange(GuestType.adult, 1)}>+</Button>
              </div>
            </MenuItem>
          )}
          {hotelProperty.guests.teens && (
            <MenuItem value={GuestType.teen}>
              {i18n.t("landingPageForm.teens")} <br></br> ({i18n.t("landingPageForm.age")} 13-17)
              <div style={{ marginLeft: '7px' }}>
                <Button onClick={() => handleGuestCountChange(GuestType.teen, -1)}>-</Button>
                {teens}
                <Button onClick={() => handleGuestCountChange(GuestType.teen, 1)}>+</Button>
              </div>
            </MenuItem>
          )}
          {hotelProperty.guests.children && (
            <MenuItem value={GuestType.kids}>
              {i18n.t("landingPageForm.kids")} <br></br>({i18n.t("landingPageForm.age")} 0-12)
              <div style={{ marginLeft: '18px' }}>
                <Button onClick={() => handleGuestCountChange(GuestType.kids, -1)}>-</Button>
                {kids}
                <Button onClick={() => handleGuestCountChange(GuestType.kids, 1)}>+</Button>
              </div>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NumberOfGuests;
