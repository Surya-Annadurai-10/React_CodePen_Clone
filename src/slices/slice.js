import { createSlice } from "@reduxjs/toolkit";

const initData = {
    isLoggedIn : false,
    userData : {

    }

}

const slice = createSlice({
    name : "CODEPEN",
    initialState : initData,
    reducers :{
        addUserData(state ,action){
         state.userData = action.payload
        },
        loggedIn(state , action) {
           state.isLoggedIn = action.payload
        }
    }
})

export const codepenReducers = slice.reducer;
export const {loggedIn,addUserData} = slice.actions;