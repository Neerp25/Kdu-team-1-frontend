import { createAsyncThunk } from "@reduxjs/toolkit";
import { DateList } from "../../types";
import { axiosRequest, prodUrlGenerator, urlGenerator } from "../../utils/util";

export const fetchCalendarDates = createAsyncThunk(
    'calendarDates/fetch',
    async (): Promise<DateList[]> => {
        const isProduction = process.env.NODE_ENV === "production";
        if (isProduction) {
            const response = await axiosRequest(prodUrlGenerator(`${process.env.FETCH_MIN_RATES}`));
            return response.data as DateList[];
        }
        
        const response = await axiosRequest(urlGenerator(`${process.env.FETCH_MIN_RATES}`));
        return response.data as DateList[];
    }
);