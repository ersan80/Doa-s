import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";

export default function ConfirmEmailPage() {
    const [params] = useSearchParams();
    const [message, setMessage] = useState("Loading...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = params.get("token");
        const email = params.get("email");

        if (!token || !email) {
            setMessage("Invalid link.");
            setLoading(false);
            return;
        }

        fetch(`/api/auth/confirm-email?token=${token}&email=${email}`)
            .then(res => res.text())
            .then(text => {
                setMessage(text);
                setLoading(false);
            })
            .catch(() => {
                setMessage("Error confirming email.");
                setLoading(false);
            });
    }, [params]);

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box textAlign="center">
                {loading ? <CircularProgress /> : <Typography variant="h6">{message}</Typography>}
            </Box>
        </Container>
    );
}
