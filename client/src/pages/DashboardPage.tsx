import { useUser } from "../hooks/useUser";
import { Typography, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
    const { token } = useAuth();
    const { user, loading } = useUser(token);

    console.log(user, loading)

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (!user) {
        return <Container>Not authenticated</Container>;
    }

    return (
        <Container>
            <Typography variant="h4">Welcome, {user.email}</Typography>
            <Typography>Email Confirmed: {user.isEmailConfirmed ? "Yes" : "No"}</Typography>
        </Container>
    );
}