import {createSlice} from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        company:[],
        currCompany:null,
        refreshCurrCompany:false,
        srchCompByName:"",
    },

    reducers:{
        getCompany:(state,action)=>{
            state.company = action.payload;
        },
        getCurrCompany:(state,action)=>{
            state.currCompany = action.payload;
        },
        getRefreshCurrComp:(state)=>{
            state.refreshCurrCompany = !state.refreshCurrCompany;
        },
        getSrchCompByName:(state,action)=>{
            state.srchCompByName = action.payload;
        }
    }
});
export const {getCompany,getCurrCompany,getRefreshCurrComp,getSrchCompByName} = companySlice.actions;
export default companySlice.reducer;