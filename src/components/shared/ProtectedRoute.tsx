import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = () => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;