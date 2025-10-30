import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
    children: JSX.Element;
    requireVerifiedEmail?: boolean;
    requireAdmin?: boolean;
}

const PUBLIC_PATHS = ["/home", "/", "/shop", "/login", "/register", "/about", "/blog"];

const ProtectedRoute = ({
    children,
    requireVerifiedEmail = false,
    requireAdmin = false,
}: ProtectedRouteProps) => {
    const { token, isAdmin } = useAuth();
    const { user, loading } = useUser(token);
    const location = useLocation();

    if (loading) return <div className="p-4 text-center">Loading...</div>;

    // 🔓 PUBLIC sayfalar için kontrol atla
    if (PUBLIC_PATHS.includes(location.pathname)) {
        return children;
    }

    // 🔒 Giriş yapılmamışsa login'e yönlendir
    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 🔐 Admin zorunluluğu varsa
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/home" replace />;
    }

    // 📧 Email doğrulama zorunluluğu varsa
    if (requireVerifiedEmail && !user.isEmailConfirmed) {
        return <Navigate to="/confirm-email" replace />;
    }

    return children;
};

export default ProtectedRoute;
