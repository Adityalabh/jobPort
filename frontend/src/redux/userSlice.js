import  {createSlice}  from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        userRefresh:false,
    },
    reducers:{
        getUser:(state,action)=>{
            state.user = action.payload;
        },
        getUSerRRefresh:(state)=>{
            state.userRefresh = !state.userRefresh;
        }
    }
});
export const {getUser,getUSerRRefresh} = userSlice.actions;
export default userSlice.reducer;