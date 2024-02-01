import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    projects:''
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers : {
        setProjects : (state,action)=>{
            console.log(action.payload)
            state.projects = action.payload
        },
        setProjectsNull : (state,action)=>{
            state.projects = ''
        }
    }
})

export const {setProjects,setProjectsNull } = projectSlice.actions
export default projectSlice.reducer;