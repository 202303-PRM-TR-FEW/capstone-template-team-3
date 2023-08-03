import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import campaignReducer from '../features/campaignSlice';
import kickOffModalReducer from '../features/kickOffModalSlice';
import paymentModalReducer from '../features/paymentModalSlice';
import campaignEditModalReducer from '../features/campaignEditSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        campaign: campaignReducer,
        kickOffModal: kickOffModalReducer,
        paymentModal: paymentModalReducer,
        campaignEditModal: campaignEditModalReducer
    },
});



