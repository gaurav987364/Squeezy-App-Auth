import { AUTH_BASE_URL } from "../constants";
import { apiSlice } from "./ApiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/register`,
                method:"POST",
                body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/login`,
                method:"POST",
                body:data,
                credentials:"include" //sent/recieve cookie
            })
        })
    })
})

export const {useRegisterMutation, useLoginMutation} = authApi;