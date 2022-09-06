import {createSlice} from '@reduxjs/toolkit'

export const walletSlice = createSlice({
    name:"phantom",
    initialState:{
        value: {}
    },
    reducers:{
        setPublicKey: (state, action)=>{
            console.log(action.payload)
            state.value = action
        }
    },
})

export const {setPublicKey} = walletSlice.actions

export default walletSlice.reducer