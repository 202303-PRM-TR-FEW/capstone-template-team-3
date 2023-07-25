import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, auth, doc, getDocs, setDoc, addDoc, collection, storage, query, where, getDownloadURL } from '@/app/firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage'

const initialState = {
    campaign: [],
    status: "idle",
    error: null
}

export const addUserCampaign = createAsyncThunk("addUserCampaign", async (data) => {
    const { projectName, goal, about, file, startDate, endDate, userId, formatDate, today, nextMonth } = data
    const fileRef = ref(storage, `folder/${file[0].name} ${userId} ${projectName}`)
    try {
        await uploadBytes(fileRef, file[0])
        const campaign = await addDoc(collection(db, "campaigns"), {
            projectName: projectName,
            goal: goal,
            about: about,
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

const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        returnToInitialState: (state) => {
            state.campaign = [],
                state.status = "idle",
                state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserCampaign.pending, (state) => {
                state.campaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(addUserCampaign.fulfilled, (state, action) => {
                state.campaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(addUserCampaign.rejected, (state, action) => {
                state.campaign = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getAllUserCampaigns.pending, (state) => {
                state.campaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getAllUserCampaigns.fulfilled, (state, action) => {
                state.campaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getAllUserCampaigns.rejected, (state, action) => {
                state.campaign = []
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const { returnToInitialState } = campaignSlice.actions;
export default campaignSlice.reducer;