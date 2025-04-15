import React, { createContext, useContext, useEffect, useState } from "react";

interface Params{
    mode:string;
    setMode:(mode:string)=>void;
}
const ThemeContext = createContext<Params | undefined>(undefined);

export const ThemeProvider = ({children}:{children:React.ReactNode})=>{
    const [mode,setMode] = useState<string>(()=>{
        if(typeof window !== "undefined"){
            return localStorage.getItem("theme") || "system"
        }
        return "system"
    });

    //handle theme change
    const handleThemechange = (theme:string)=>{
        const root = document.documentElement;

        if(theme === "system"){
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            //so
            root.classList.toggle("dark", isDark);
        } else{
            root.classList.toggle("dark", theme === "dark");
        }
    };

    useEffect(()=>{
        handleThemechange(mode);
        localStorage.setItem("theme", mode);
    },[mode]);
    
    return (
        <ThemeContext.Provider value={{mode,setMode}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = ()=>{
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error("Context must be use with in Provider.")
    }
    return context;
};