import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../Redux/features/auth/authSlice";



export const store = configureStore({
    reducer: {

        auth: authReducer,
        
    }
})