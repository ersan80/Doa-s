import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

interface ProtectedRouteProps {
    children: JSX.Element;
    requireVerifiedEmail?: boolean;
}

const ProtectedRoute = ({ children, requireVerifiedEmail = false }: ProtectedRouteProps) => {
    const {token } = useAuth()
    const { user, loading } = useUser(token);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (requireVerifiedEmail && !user.isEmailConfirmed) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
