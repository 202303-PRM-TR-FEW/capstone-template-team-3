import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const campaignModalSlice = createSlice({
    name: "campaignEditModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        }
    }
})

export const { openModal, closeModal } = campaignModalSlice.actions
export default campaignModalSlice.reducer