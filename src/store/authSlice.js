import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:null,
    userData:null
}

const authSlice=createSlice({
    name:  "auth",
    initialState,
    reducers:{
        login: (state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout: (state,action)=>{
          state.status=false;
          state.userData=null;
        }
    }
})

export default authSlice.reducer;
export  const{login,logout}=authSlice.actions;