import { createSlice } from "@reduxjs/toolkit";

const initData = {
    userData : {

    }
}

const slice = createSlice({
    name : "CODEPEN",
    initialState : initData,
    reducers :{
        addUserData(state ,action){
         state.userData = action.payload
        }
    }
})

export const codepenReducers = slice.reducer;
export const {addUserData} = slice.actions;