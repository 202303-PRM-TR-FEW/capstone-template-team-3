import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, db, addDoc, auth } from '@/app/firebase/firebase';

const initialState = {
    user: null,
    status: "idle",
    error: null
}

export const userSignInWithEmailAndPassword = createAsyncThunk(
    "signInWithEmailAndPassword",
    async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    })

export const userSignUpWithEmailAndPassword = createAsyncThunk(
    "signUpWithEmailAndPassword",
    async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password, data.name)
            await addDoc(collection(db, "users"), {
                acceptedTermsAndConditions: data.checkbox,
                email: data.email,
                id: userCredential.user.uid,
                name: data.name,
            })
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }
)

export const userSignOut = createAsyncThunk(
    "userSignOut",
    async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        returnToInitialState: (state) => {
            state.user = null,
                state.status = "idle",
                state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignInWithEmailAndPassword.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userSignInWithEmailAndPassword.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userSignInWithEmailAndPassword.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(userSignUpWithEmailAndPassword.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userSignUpWithEmailAndPassword.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userSignUpWithEmailAndPassword.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
    }
});

export const { returnToInitialState } = userSlice.actions;
// export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
