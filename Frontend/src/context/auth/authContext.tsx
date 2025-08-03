/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from "react";
import { useAuth } from "../../hooks/useAuth";

interface UserType {
    name:string;
    email:string;
    isEmailVerified:boolean;
    createdAt: Date;
    updatedAt: Date;
};

interface AuthType {
    user?:UserType;
    isLoading:boolean;
    isError:boolean;
}
const AuthContext = createContext<AuthType | undefined>(undefined);

export const AuthProvider = ({children}:{children:React.ReactNode})=>{
    const {isError,isLoading,data}= useAuth();
    const user = data?.data?.user;

    return(
        <AuthContext.Provider value={{user,isError,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useCurrentUserContext must be used within a AuthProvider");
    }
    return context;
}