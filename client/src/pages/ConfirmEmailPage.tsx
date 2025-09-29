import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { showSuccess, showError } from "../utils/toastHelper";

export default function ConfirmEmailPage() {
    const [params] = useSearchParams();
    const [message, setMessage] = useState("Loading...");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const token = params.get("token");
        const email = params.get("email");

        if (!token || !email) {
            setMessage("Invalid link.");
            setLoading(false);
            showError("Invalid confirmation link.");
            setTimeout(() => navigate("/login"), 3000);
            return;
        }

        fetch(`${API_BASE_URL}/ConfirmEmail?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                
                setMessage(data.message);
                setLoading(false);
                if (data.success) {
                    showSuccess("Email confirmed successfully!");
                    setTimeout(() => navigate("/login?confirmed=true"), 2000);
                } else {
                    showError(data.message || "Error confirming email.");
                    setTimeout(() => navigate("/login"), 3000);
                }
            })
            .catch(() => {
                setMessage("Error confirming email.");
                setLoading(false);
                showError("Something went wrong. Please try again.");
                setTimeout(() => navigate("/login"), 3000);
            });
    }, [params, navigate]);

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box textAlign="center">
                {loading ? <CircularProgress /> : <Typography variant="h6">{message}</Typography>}
            </Box>
        </Container>
    );
}