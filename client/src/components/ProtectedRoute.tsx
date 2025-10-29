import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
    children: JSX.Element;
    requireVerifiedEmail?: boolean;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({
    children,
    requireVerifiedEmail = false,
    requireAdmin = false,
}: ProtectedRouteProps) => {
    const { token, isAdmin } = useAuth();
    const { user, loading } = useUser(token);
    const location = useLocation();

    if (loading) return <div className="p-4 text-center">Loading...</div>;

    // 🔒 Eğer giriş yapılmamışsa login'e yönlendir
    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 🔐 Eğer bu sayfa admin istiyorsa ama kullanıcı admin değilse
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/home" replace />;
    }

    // 📧 E-posta doğrulaması gerekli ama kullanıcı doğrulanmamışsa
    if (requireVerifiedEmail && !user.isEmailConfirmed) {
        return <Navigate to="/confirm-email" replace />;
    }

    return children;
};

export default ProtectedRoute;
