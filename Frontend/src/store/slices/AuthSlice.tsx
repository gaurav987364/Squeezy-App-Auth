/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//initialstate
const initialState = {
    userInfo:localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")!) 
    : null,
    isAuthenticated:false, //for login/logout thing
    session:null
};
const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));

            // Use server-provided expiration time
            const expiresIn = action.payload.expiresIn || 15 * 60; // Fallback 15min
            const expiryTime = Date.now() + expiresIn * 1000;
            // const expiryTime = Date.now() + action.payload.expiresIn * 1000; // new Date().getTime()+ 15 * 60 * 1000; //15m
            localStorage.setItem("expiryTime", expiryTime.toString());

            state.isAuthenticated = true; // user logged-in
        },
        setSession: (state, action: PayloadAction<any>) => {
            state.session = action.payload;
        },
        logout:(state)=>{
            state.userInfo = null;
            state.isAuthenticated = false; //user logged-out
            state.session = null;
            localStorage.clear()
        },
    }
});

export {AuthSlice};
export const { logout, setCredentials, setSession } = AuthSlice.actions;