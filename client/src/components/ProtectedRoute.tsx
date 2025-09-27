import { useUser } from "../hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: JSX.Element;
    requireVerifiedEmail?: boolean;
}

const ProtectedRoute = ({ children, requireVerifiedEmail = false }: ProtectedRouteProps) => {
    const { token } = useAuth();
    const { user, loading } = useUser(token);
    const location = useLocation();

    if (loading) return <div className="p-4 text-center">Loading...</div>;

    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireVerifiedEmail && !user.isEmailConfirmed) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
