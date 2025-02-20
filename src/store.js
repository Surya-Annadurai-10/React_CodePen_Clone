import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import { codepenReducers } from "./slices/slice"

export const store = configureStore({
    reducer :{
       codepenData : codepenReducers
    },

    middleware : (getDefaultMiddleWare) => ([...getDefaultMiddleWare() , logger])
})