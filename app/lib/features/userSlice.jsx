import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('user')
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
