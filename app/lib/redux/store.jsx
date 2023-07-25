import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import campaignReducer from '../features/campaignSlice';
import kickOffModalReducer from '../features/kickOffModalSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        campaign: campaignReducer,
        modal: kickOffModalReducer
    },
});



