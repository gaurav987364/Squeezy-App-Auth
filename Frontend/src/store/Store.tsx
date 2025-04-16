import {configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./api/ApiSlice";
import { AuthSlice } from "./slices/AuthSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const Store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:AuthSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

setupListeners(Store.dispatch);

export default Store;


//types;
export type RootState = ReturnType<typeof Store.getState>;
export type Dispatch = typeof Store.dispatch;



