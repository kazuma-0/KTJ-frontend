import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"phantom",
    initialState:{
        value: {}
    },
    reducers:{
        setUser: (state, action)=>{
            state.value = action
        }
    },
})

export const {setUser} = userSlice.actions

export default userSlice.reducer