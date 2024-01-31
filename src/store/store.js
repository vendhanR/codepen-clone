import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import projectSliceReducer from "./slices/projectSlice";

export const store = configureStore({
    reducer:{
        user: userSliceReducer,
        projects : projectSliceReducer 
    }
})