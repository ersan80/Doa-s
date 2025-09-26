import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
    children: React.ReactNode;
    requireVerifiedEmail?: boolean;
};

export default function ProtectedRoute({
    children,
    requireVerifiedEmail = false,
}: ProtectedRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireVerifiedEmail && !user?.emailConfirmed) {
        return <Navigate to="/confirm-email" replace />;
    }

    return <>{children}</>;
}
