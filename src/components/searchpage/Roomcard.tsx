import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { LocationOn as LocationIcon, People as OccupancyIcon, Bed as BedIcon } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import { Result } from '../../types';
import { bedTypeTextGenerator } from '../../utils/util';

// Define styled components
const RoomCardContainer = styled(Card)`
 margin: 20px;
 width: 300px;
  
 @media (max-width: 768px) {
    margin: 0 auto;
    width: 400px;
 }
`;

const StyledImage = styled.img`
 width: 100%;
 height: 200px;
 object-fit: cover;
 border-radius: 5px;
`;

const IconTextContainer = styled.div`
 display: flex;
 align-items: center;
 margin-bottom: 8px;
`;

const TitleContainer = styled.div`
 display: flex;
 align-items: center;
 margin-top: 0px;
 margin-left: 5px;
`;

const ReviewsContainer = styled.div`
 margin-left: auto;
`;

const LocationText = styled(Typography)`
 margin-left: 2px;
`;

const DealsContainer = styled.div`
 margin-top: 8px;
 margin-left: -16px;
`;

const SpecialDealText = styled(Typography)`
 font-weight: bold;
 color: black;
`;

const NewPropertyBox = styled(Box)`
 background-color: #cdcdee;
 border-radius: 4px;
 padding: 4px;
`;

// Styled components for icons
const StyledStarIcon = styled(StarIcon)`
 margin-right: 1px;
 color: #26266d;
 margin-top: 26px;
`;

const StyledLocationIcon = styled(LocationIcon)`
 margin-right: 1px;
 color: grey;
`;

const StyledBedIcon = styled(BedIcon)`
 margin-right: 4px;
 color: grey;
`;

const StyledOccupancyIcon = styled(OccupancyIcon)`
 margin-right: 4px;
 color: grey;
`;


const RoomCard: React.FC<Result> = ({
  room_type_name,
  area_in_square_feet,
  average_rate,
  double_bed,
  max_capacity,
  single_bed,
  rating,
  reviews,
  lowResImages
}) => {
  return (
    <RoomCardContainer>
      <Carousel cycleNavigation={true} navButtonsAlwaysVisible={true} animation='slide'>
        {lowResImages.map((image, index) => (
          <StyledImage key={index} src={image} alt={`Room ${index}`} />
        ))}
      </Carousel>
      <CardContent>
        <TitleContainer>
          <Typography variant="h6" component="div">
            {room_type_name}
          </Typography>
          <ReviewsContainer>
            {reviews.length > 0 ? (
              <>
                <IconTextContainer>
                  <StyledStarIcon fontSize="small" />
                  <Typography variant="body1" color="text.secondary" style={{ marginTop: '26px' }}>
                    {rating}
                  </Typography>
                </IconTextContainer>
                <Typography variant="body1" color="text.secondary">
                  {reviews.length} reviews
                </Typography>
              </>
            ) : (
              <NewPropertyBox>
                <Typography variant="body1" color="black">
                  New property
                </Typography>
              </NewPropertyBox>
            )}
          </ReviewsContainer>
        </TitleContainer>

        <IconTextContainer>
          <StyledLocationIcon fontSize="small" />
          <LocationText variant="body1" color="text.secondary">
            Kickdrum
          </LocationText>
        </IconTextContainer>
        <LocationText variant="body1" color="text.secondary">
          Inclusive {area_in_square_feet} ft.
        </LocationText>
        <IconTextContainer>
          <StyledBedIcon fontSize="small" />
          <Typography variant="body1" color="text.secondary">
            {bedTypeTextGenerator(double_bed, single_bed)}
          </Typography>
        </IconTextContainer>
        <IconTextContainer>
          <StyledOccupancyIcon fontSize="small" />
          <Typography variant="body1" color="text.secondary">
            1-{max_capacity}
          </Typography>
        </IconTextContainer>

        {/* <DealsContainer>
          <svg
            width="121"
            height="32"
            viewBox="0 0 121 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M120.759 0H0V32H120.759L112.775 14.9677L120.759 0Z"
              fill="#26266D"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontWeight="400"
              fontSize="16px"
            >
              Special Deal
            </text>
          </svg>
        </DealsContainer>
        <Typography variant="body1" color="text.secondary">
          {deals.join(', ')}
        </Typography> */}
        <SpecialDealText variant="body1" color="text.secondary">
          ${average_rate}
        </SpecialDealText>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          per night
        </Typography>
        <Button variant="contained" color="primary">
          Select Room
        </Button>
      </CardContent>
    </RoomCardContainer>
  );
};

export default RoomCard;


