import { useUser } from "../hooks/useUser";
import { Typography, Container } from "@mui/material";

export default function DashboardPage() {
    const { user, loading } = useUser();

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