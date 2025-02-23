import { createSlice } from "@reduxjs/toolkit";

const initData = {
    isLoggedIn : false,
    userData : {},
    projects : [],
    pinned :[]

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
        },
        addProjects(state , action) {
            state.projects.push(action.payload);
        },
        initialRender(state , action) {
             state.projects = [...action.payload];
        },
        initialRenderToPinned(state,action){
          state.pinned = [...action.payload]  
        },
        deleteProject(state, action){
          state.projects.splice(action.payload , 1);
        },
        pinProject(state , action){
            let index = state.projects.findIndex(ele => ele.id == action.payload);
            let indexValue = state.projects.find(ele => ele.id == action.payload);
             
            state.pinned.push(indexValue)
            state.projects.splice(index , 1)
        },
        UnpinProject(state ,action){
            let index = state.pinned.findIndex(ele => ele.id == action.payload);
            let indexValue = state.pinned.find(ele => ele.id == action.payload);
             
            state.projects.push(indexValue)
            state.pinned.splice(index , 1)
        },
        LoggedOut(state, action){
          state.isLoggedIn = action.payload
        }
    }
})

export const codepenReducers = slice.reducer;
export const {LoggedOut,initialRenderToPinned,UnpinProject,pinProject,deleteProject,initialRender,addProjects,loggedIn,addUserData} = slice.actions;