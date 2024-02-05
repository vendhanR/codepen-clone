import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    projects:[],
    openProject : {}
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers : {
        setProjects : (state,action)=>{
            state.projects = action.payload
        },
        setProjectsNull : (state)=>{
            state.projects = ''
        },
        openExistingProject : (state, action) => {
            state.openProject = action.payload
            
        }
    }
})

export const {setProjects,setProjectsNull,openExistingProject } = projectSlice.actions
export default projectSlice.reducer;