import { FaLaptop, FaRegMoon, FaSun } from "react-icons/fa";

export const themes = [
    { value: "light", label: "Light",icon:FaSun },
    { value: "dark", label: "Dark",icon:FaRegMoon },
    { value: "system", label: "System",icon:FaLaptop },
];

export const mockUser = {
    name:"John",
    email:"abc@gmail.com",
    isEmailVerified:true,
    createdAt:new Date()
}