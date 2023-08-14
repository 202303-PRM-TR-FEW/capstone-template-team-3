import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth, signInWithPopup, googleAuthProvider, githubAuthProvider, twitterAuthProvider, doc, getDoc, setDoc, query, where, collection, updateDoc, getDownloadURL, storage, deleteField } from '@/app/firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage'

const initialState = {
    user: null,
    campaignOwner: null,
    campaignOwnerProfileData: null,
    status: "idle",
    error: null
}

export const getUserData = createAsyncThunk("getUserData", async (userId) => {
    try {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        throw error
    }
})

export const getCampaignOwnerProfileData = createAsyncThunk("getCampaignOwnerProfileData", async (userId) => {
    try {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        throw error
    }
})

export const getCampaignOwnerData = createAsyncThunk("getCampaignOwnerData", async (currentCampaignId) => {
    try {
        const docRef = doc(db, "users", currentCampaignId)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        throw error
    }
})

export const userJoinNewsletter = createAsyncThunk("userJoinNewsletter", async (userId) => {
    try {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const updatedUser = await updateDoc(docRef, {
                joinedNewsletter: true
            })
            return updatedUser.data()
        }
        return docSnap.data()
    } catch (error) {
        throw error
    }
})

export const userUpdatePhoto = createAsyncThunk("userUpdatePhoto", async (data) => {
    const { userId, currentUserName, file } = data
    const fileRef = ref(storage, `userImage/${file[0].name} ${userId} ${currentUserName}`)
    try {
        await uploadBytes(fileRef, file[0])
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const updatedUser = await updateDoc(docRef, {
                photo: await getDownloadURL(fileRef)
            })
            return updatedUser.data()
        }
        return docSnap.data()
    } catch (error) {
        throw error
    }
})

export const userDeletePhoto = createAsyncThunk("userDeletePhoto", async (userId) => {
    try {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const updatedUser = await updateDoc(docRef, {
                photo: deleteField()
            })
            return updatedUser.data()
        }
        return docSnap.data()
    } catch (error) {
        throw error
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
            throw error
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
            throw error
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
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    acceptedTermsAndConditions: true,
                    email: userCredential.user.email,
                    id: userCredential.user.uid,
                    name: userCredential.user.displayName,
                    photo: userCredential.user.photoURL
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            throw error
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
                    photo: userCredential.user.photoURL
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            throw error
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
                    photo: userCredential.user.photoURL
                })
            }
            handleRoute()
            return userCredential.user
        } catch (error) {
            throw error
        }
    })

export const userSignOut = createAsyncThunk(
    "userSignOut",
    async () => {
        try {
            await signOut(auth)
        } catch (error) {
            throw error
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        returnToInitialState: (state) => {
            state.user = null,
                state.campaignOwner = null,
                state.campaignOwnerProfileData = null,
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
            .addCase(getCampaignOwnerProfileData.pending, (state) => {
                state.campaignOwnerProfileData = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(getCampaignOwnerProfileData.fulfilled, (state, action) => {
                state.campaignOwnerProfileData = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getCampaignOwnerProfileData.rejected, (state, action) => {
                state.campaignOwnerProfileData = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getCampaignOwnerData.pending, (state) => {
                state.campaignOwner = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(getCampaignOwnerData.fulfilled, (state, action) => {
                state.campaignOwner = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getCampaignOwnerData.rejected, (state, action) => {
                state.campaignOwner = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(userJoinNewsletter.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userJoinNewsletter.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userJoinNewsletter.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(userUpdatePhoto.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userUpdatePhoto.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userUpdatePhoto.rejected, (state, action) => {
                state.user = {}
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(userDeletePhoto.pending, (state) => {
                state.user = {}
                state.status = "loading"
                state.error = null
            })
            .addCase(userDeletePhoto.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(userDeletePhoto.rejected, (state, action) => {
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
