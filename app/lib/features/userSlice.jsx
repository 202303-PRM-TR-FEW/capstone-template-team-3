import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth, signInWithPopup, googleAuthProvider, githubAuthProvider, twitterAuthProvider, doc, getDoc, setDoc, query, where, collection } from '@/app/firebase/firebase';

const initialState = {
    user: null,
    status: "idle",
    error: null
}

export const getUserData = createAsyncThunk("getUserData", async (userId) => {
    try {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
})

export const userSignInWithEmailAndPassword = createAsyncThunk(
    "signInWithEmailAndPassword",
    async (data) => {
        const { email, password, handleRoute } = data
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            handleRoute()
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    })

export const userSignUpWithEmailAndPassword = createAsyncThunk(
    "signUpWithEmailAndPassword",
    async (data) => {
        const { email, password, name, checkbox, handleRoute } = data
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, name, checkbox)
            const userId = userCredential.user.uid
            const docRef = doc(db, "users", userId)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    acceptedTermsAndConditions: checkbox,
                    email: email,
                    id: userCredential.user.uid,
                    name: name,
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }
)

export const userSignInWithGoogle = createAsyncThunk(
    "signInWithGoogle",
    async (data) => {
        const { handleRoute } = data
        const provider = googleAuthProvider
        try {
            const userCredential = await signInWithPopup(auth, provider)
            const userId = userCredential.user.uid
            const docRef = doc(db, "users", userId)
            const docSnap = await getDoc(docRef)
            console.log(docSnap.exists())
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    acceptedTermsAndConditions: true,
                    email: userCredential.user.email,
                    id: userCredential.user.uid,
                    name: userCredential.user.displayName,
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    })

export const userSignInWithGithub = createAsyncThunk(
    "signInWithGithub",
    async (data) => {
        const { handleRoute } = data
        const provider = githubAuthProvider
        try {
            const userCredential = await signInWithPopup(auth, provider)
            const userId = userCredential.user.uid
            const docRef = doc(db, "users", userId)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    acceptedTermsAndConditions: true,
                    email: userCredential.user.email,
                    id: userCredential.user.uid,
                    name: userCredential.user.displayName,
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    })

export const userSignInWithTwitter = createAsyncThunk(
    "signInWithTwitter",
    async (data) => {
        const { handleRoute } = data
        const provider = twitterAuthProvider
        try {
            const userCredential = await signInWithPopup(auth, provider)
            const userId = userCredential.user.uid
            const docRef = doc(db, "users", userId)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    acceptedTermsAndConditions: true,
                    email: userCredential.user.email,
                    id: userCredential.user.uid,
                    name: userCredential.user.displayName,
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    })

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
            .addCase(getUserData.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
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
            .addCase(userSignInWithGoogle.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userSignInWithGoogle.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userSignInWithGoogle.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(userSignInWithGithub.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userSignInWithGithub.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userSignInWithGithub.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(userSignInWithTwitter.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userSignInWithTwitter.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userSignInWithTwitter.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
    }
});

export const { returnToInitialState } = userSlice.actions;
// export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
