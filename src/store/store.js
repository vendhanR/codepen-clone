import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import projectSliceReducer from "./slices/projectSlice";
import searchSliceReducer from "./slices/searchSlice";

export const store = configureStore({
    reducer:{
        user: userSliceReducer,
        projects : projectSliceReducer,
        searchTerm :searchSliceReducer
    }
})