import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
    const { data, isLoading } = useAuth();
    const user = data?.data?.user;
  
    if (isLoading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-[rgba(255,255,255,.2)] text-2xl">
          <Loader />
          <span className="ml-3">Loading Squeezy...</span>
        </div>
      );
    }
    return !user ? <Outlet /> : <Navigate to="/home" replace />;
}

export default PublicRoute;