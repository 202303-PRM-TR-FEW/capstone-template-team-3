import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, auth, doc, getDocs, getDoc, setDoc, updateDoc, addDoc, collection, storage, query, where, getDownloadURL, increment, arrayUnion, deleteDoc, orderBy, limit } from '@/app/firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage'

const initialState = {
    allCampaigns: [],
    userCampaigns: [],
    userDonations: [],
    charities: [],
    campaignOfTheWeek: [],
    ownerCampaigns: [],
    ownerDonations: [],
    currentCampaign: [],
    status: "idle",
    error: null
}

export const getAllCampaigns = createAsyncThunk("getAllCampaigns", async () => {
    try {
        const allCampaigns = await getDocs(collection(db, "campaigns"));
        return allCampaigns.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    } catch (error) {
        throw error
    }
})

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
        throw error
    }
})

export const addUserDonation = createAsyncThunk("addUserDonation", async (data) => {
    const { currentUserId, campaignId, donation, checkbox } = data
    try {
        const docRef = doc(db, "campaigns", campaignId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists() && !checkbox) {
            const updatedCampaign = await updateDoc(docRef, {
                raised: increment(donation),
                donators: arrayUnion(currentUserId)
            })
            return updatedCampaign
        }
        else if (docSnap.exists() && checkbox) {
            const updatedCampaign = await updateDoc(docRef, {
                raised: increment(donation),
                donators: arrayUnion(currentUserId),
                charity: increment(donation * 0.02)
            })
            return updatedCampaign
        }
    } catch (error) {
        throw error
    }
})

export const getCharities = createAsyncThunk("getCharities", async () => {
    try {
        const q = query(collection(db, "campaigns"), where("charity", ">", 0))
        const allCharityCampaigns = await getDocs(q)
        const allCharity = allCharityCampaigns.docs.map((doc) => doc.data().charity)
        return allCharity
    } catch (error) {
        throw error
    }
})

export const getCampaignOfTheWeek = createAsyncThunk("getCampaignOfTheWeek", async () => {
    try {
        const q = query(collection(db, "campaigns"), orderBy("raised", "desc"), limit(1))
        const campaignOfTheWeek = await getDocs(q)
        const campaign = campaignOfTheWeek.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        return campaign
    } catch (error) {
        throw error
    }
})

export const getCurrentCampaign = createAsyncThunk("getCurrentCampaign", async (campaignId) => {
    try {
        const docRef = doc(db, "campaigns", campaignId);
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        throw error
    }
})

export const updateCurrentCampaign = createAsyncThunk("updateCurrentCampaign", async (data) => {
    const { campaignId, projectName, about, file, category, userId } = data
    const fileRef = ref(storage, `folder/${file[0].name} ${userId} ${projectName}`)
    try {
        await uploadBytes(fileRef, file[0])
        const docRef = doc(db, "campaigns", campaignId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const updatedCampaign = await updateDoc(docRef, {
                projectName: projectName,
                about: about,
                image: await getDownloadURL(fileRef),
                category: category
            })
            return updatedCampaign
        }
    } catch (error) {
        throw error
    }
})

export const deleteCurrentCampaign = createAsyncThunk("deleteCurrentCampaign", async (data) => {
    const { campaignId } = data
    try {
        const docRef = doc(db, "campaigns", campaignId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const deletedCampaign = await deleteDoc(docRef)
            return deletedCampaign
        }
    } catch (error) {
        throw error
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
        return allCampaigns
    } catch (error) {
        throw error
    }
})

export const getAllOwnerCampaigns = createAsyncThunk("getAllOwnerCampaigns", async (userId) => {
    try {
        const q = query(collection(db, "campaigns"), where("id", "==", userId))
        const allOwnerCampaigns = await getDocs(q)
        const allCampaigns = allOwnerCampaigns.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })
        return allCampaigns
    } catch (error) {
        throw error
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
        return allDonations
    } catch (error) {
        throw error
    }
})

export const getAllOwnerDonations = createAsyncThunk("getAllOwnerDonations", async (userId) => {
    try {
        const q = query(collection(db, "campaigns"), where("donators", "array-contains", userId))
        const allOwnerDonations = await getDocs(q)
        const allDonations = allOwnerDonations.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })
        return allDonations
    } catch (error) {
        throw error
    }
})

const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        returnToInitialState: (state) => {
            state.allCampaigns = []
            state.userCampaigns = []
            state.userDonations = []
            state.charities = []
            state.campaignOfTheWeek = []
            state.ownerCampaigns = []
            state.ownerDonations = []
            state.currentCampaign = []
            state.status = "idle"
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCampaigns.pending, (state) => {
                state.allCampaigns = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getAllCampaigns.fulfilled, (state, action) => {
                state.allCampaigns = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getAllCampaigns.rejected, (state, action) => {
                state.allCampaigns = []
                state.status = "failed"
                state.error = action.error.message
            })
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
            .addCase(getCharities.pending, (state) => {
                state.charities = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getCharities.fulfilled, (state, action) => {
                state.charities = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getCharities.rejected, (state, action) => {
                state.charities = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getCampaignOfTheWeek.pending, (state) => {
                state.campaignOfTheWeek = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getCampaignOfTheWeek.fulfilled, (state, action) => {
                state.campaignOfTheWeek = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getCampaignOfTheWeek.rejected, (state, action) => {
                state.campaignOfTheWeek = []
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
            .addCase(updateCurrentCampaign.pending, (state) => {
                state.currentCampaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(updateCurrentCampaign.fulfilled, (state, action) => {
                state.currentCampaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(updateCurrentCampaign.rejected, (state, action) => {
                state.currentCampaign = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(deleteCurrentCampaign.pending, (state) => {
                state.currentCampaign = []
                state.status = "loading"
                state.error = null
            })
            .addCase(deleteCurrentCampaign.fulfilled, (state, action) => {
                state.currentCampaign = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(deleteCurrentCampaign.rejected, (state, action) => {
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
            .addCase(getAllOwnerCampaigns.pending, (state) => {
                state.ownerCampaigns = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getAllOwnerCampaigns.fulfilled, (state, action) => {
                state.ownerCampaigns = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getAllOwnerCampaigns.rejected, (state, action) => {
                state.ownerCampaigns = []
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
            .addCase(getAllOwnerDonations.pending, (state) => {
                state.ownerDonations = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getAllOwnerDonations.fulfilled, (state, action) => {
                state.ownerDonations = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getAllOwnerDonations.rejected, (state, action) => {
                state.ownerDonations = []
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const { returnToInitialState } = campaignSlice.actions;
export default campaignSlice.reducer;