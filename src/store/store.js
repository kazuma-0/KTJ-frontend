import {configureStore} from "@reduxjs/toolkit";
import Wallet from "./slices/wallet";
import user from "./slices/user";
export default configureStore({
    reducer:{
        wallet: Wallet,
        user: user
    }
})