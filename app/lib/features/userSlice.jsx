import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('user')) || null;
    }
    return null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: getInitialUser(),
    },
    reducers: {
        login: (state, action) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
            state.user = action.payload;
        },
        logout: (state) => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
