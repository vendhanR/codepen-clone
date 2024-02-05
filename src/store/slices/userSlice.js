import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null
}

const userSlice  = createSlice({
    name : "user",
    initialState,
    reducers:{
        setUser: (state,actions)=>{
            state.user = actions.payload;
        },
        setUserNull: (state) =>{
            state.user = ""
        }
    }
})

export const {setUser , setUserNull} = userSlice.actions;
export default userSlice.reducer;