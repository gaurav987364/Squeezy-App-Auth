import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
    const { user } = useAuth();
    return !user ? <Outlet /> : <Navigate to="/home" replace />;
}

export default PublicRoute;

//replace means =>replace means it replaces the current entry in the browser history, so pressing the back button won’t take them back to the /login page.