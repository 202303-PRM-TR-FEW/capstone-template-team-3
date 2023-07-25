import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const kickOffModalSlice = createSlice({
    name: "kickOffModal",
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

export const { openModal, closeModal } = kickOffModalSlice.actions
export default kickOffModalSlice.reducer