// import  createSlice  from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        alljobs: [],
        jobRefresh: false,
        allAdminJob: [],
        adminJobRefresh: false,
        // savedJobs:[],
        currJob: null,
        currJobRefresh: false,
        srchJobByText: null,
    },

    reducers: {
        getJob: (state, action) => {
            state.alljobs = action.payload;
        },
        setJobRefresh: (state) => {
            state.jobRefresh = !state.jobRefresh;
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJob = action.payload;
        },
        setAdminJobRefresh: (state) => {
            state.adminJobRefresh = !state.adminJobRefresh;
        },
        setCurrJob: (state, action) => {
            state.currJob = action.payload;
        },
        setsrchJobByText: (state, action) => {
            state.srchJobByText = action.payload;
        },
        // setSavedJobs: (state, action) => {
        //     const job = action.payload;
        //     if (Array.isArray(state.savedJobs) && !state.savedJobs.includes(job._id)) { 
        //         state.savedJobs.push(job) 
        //     }
        // }
        setCurrJobRefresh: (state) => {
            state.currJobRefresh = !state.currJobRefresh;
        }
    }
});

export const { getJob, setJobRefresh, setAllAdminJob, setAdminJobRefresh, setCurrJob, setsrchJobByText, setCurrJobRefresh } = jobSlice.actions;
export default jobSlice.reducer;
