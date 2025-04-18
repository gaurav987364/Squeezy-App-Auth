import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const AuthRoute = () => {
    const {user} = useAuth();
    return user ? <Outlet/> : <Navigate to="/login" replace/>
}

export default AuthRoute;