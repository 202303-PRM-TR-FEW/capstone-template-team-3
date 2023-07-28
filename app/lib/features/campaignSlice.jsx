import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, auth, doc, getDocs, getDoc, setDoc, updateDoc, addDoc, collection, storage, query, where, getDownloadURL, increment, arrayUnion } from '@/app/firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage'

const initialState = {
    userCampaigns: [],
    userDonations: [],
    currentCampaign: [],
    status: "idle",
    error: null
}

export const addUserCampaign = createAsyncThunk("addUserCampaign", async (data) => {
    const { currentUserName, projectName, goal, about, file, category, startDate, endDate, userId, formatDate, today, nextMonth } = data
    const fileRef = ref(storage, `folder/${file[0].name} ${userId} ${projectName}`)
    try {
        await uploadBytes(fileRef, file[0])
        const campaign = await addDoc(collection(db, "campaigns"), {
            owner: currentUserName,
            projectName: projectName,
            goal: goal,
            about: about,
            category: category,
            startDate: startDate !== null ? startDate : formatDate(today),
            endDate: endDate !== null ? endDate : formatDate(nextMonth),
            id: userId,
            donators: [],
            image: await getDownloadURL(fileRef),
            raised: 0
        });
        return campaign
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
})

export const addUserDonation = createAsyncThunk("addUserDonation", async (data) => {
    const { currentUserId, campaignId, donation, checkbox } = data
    try {
        const docRef = doc(db, "campaigns", campaignId)
        const docSnap = await getDoc(docRef)
        console.log(docSnap)
        if (docSnap.exists()) {
            const updatedCampaign = await updateDoc(docRef, {
                raised: increment(donation),
                donators: arrayUnion(currentUserId)
            })
            return updatedCampaign
        }
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
})

export const getCurrentCampaign = createAsyncThunk("getCurrentCampaign", async (campaignId) => {
    try {
        const docRef = doc(db, "campaigns", campaignId);
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
})

export const getAllUserCampaigns = createAsyncThunk("getAllUserCampaigns", async (userId) => {
    try {
        const q = query(collection(db, "campaigns"), where("id", "==", userId))
        const allUserCampaigns = await getDocs(q)
        const allCampaigns = allUserCampaigns.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })
        console.log(allCampaigns)
        return allCampaigns
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
})

export const getAllUserDonations = createAsyncThunk("getAllUserDonations", async (userId) => {
    try {
        const q = query(collection(db, "campaigns"), where("donators", "array-contains", userId))
        const allUserDonations = await getDocs(q)
        const allDonations = allUserDonations.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })
        console.log(allDonations)
        return allDonations
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
})

const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        returnToInitialState: (state) => {
            state.userCampaigns = []
            state.userDonations = []
            state.currentCampaign = []
            state.status = "idle"
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserCampaign.pending, (state) => {
                state.currentCampaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(addUserCampaign.fulfilled, (state, action) => {
                state.currentCampaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(addUserCampaign.rejected, (state, action) => {
                state.currentCampaign = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addUserDonation.pending, (state) => {
                state.currentCampaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(addUserDonation.fulfilled, (state, action) => {
                state.currentCampaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(addUserDonation.rejected, (state, action) => {
                state.currentCampaign = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getCurrentCampaign.pending, (state) => {
                state.currentCampaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getCurrentCampaign.fulfilled, (state, action) => {
                state.currentCampaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getCurrentCampaign.rejected, (state, action) => {
                state.currentCampaign = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getAllUserCampaigns.pending, (state) => {
                state.userCampaigns = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getAllUserCampaigns.fulfilled, (state, action) => {
                state.userCampaigns = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getAllUserCampaigns.rejected, (state, action) => {
                state.userCampaigns = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getAllUserDonations.pending, (state) => {
                state.userDonations = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getAllUserDonations.fulfilled, (state, action) => {
                state.userDonations = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getAllUserDonations.rejected, (state, action) => {
                state.userDonations = []
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const { returnToInitialState } = campaignSlice.actions;
export default campaignSlice.reducer;