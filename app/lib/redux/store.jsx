import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import campaignSlice from '../features/campaignSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        campaign: campaignSlice,
    },
});



