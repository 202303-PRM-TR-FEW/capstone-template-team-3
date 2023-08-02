import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const paymentModalSlice = createSlice({
    name: "paymentModal",
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

export const { openModal, closeModal } = paymentModalSlice.actions
export default paymentModalSlice.reducer