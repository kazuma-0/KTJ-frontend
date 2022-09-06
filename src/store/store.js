import {configureStore} from "@reduxjs/toolkit";
import Wallet from "./slices/wallet";
import thunk from "redux-thunk";
export default configureStore({
    reducer:{
        wallet: Wallet
    }
})