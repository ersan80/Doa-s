import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    CircularProgress,
} from "@mui/material";
import { fetchJson } from "../utils/fetchJson";
import { showSuccess, showError, showInfo } from "../utils/toastHelper";
import ToastProvider from "./ToastContainer";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterData>({
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const data = await fetchJson<{ success: boolean; message?: string; token?: string; isEmailConfirmed?: boolean }>(
                `${API_BASE_URL}/Register`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword
                    }),
                }
            );

            if (data.success) {
                showSuccess("Registration successful! 🎉");
                showInfo("Please confirm your email before logging in.");
                setFormData({ name: "", email: "", password: "", confirmPassword: "" });
                
                console.log("data token = ", data.token)

                // 1-2 sn bekleyip login sayfasına yönlendir
                setTimeout(() => navigate("/login"), 2000);
            } else {
                showError(data.message || "Registration failed.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                showError(error.message);
            } else {
                showError("Unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container maxWidth="xs" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            Register
                        </Typography>
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                            required
                            margin="normal"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            required
                            margin="normal"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#7d6c6c",
                                "&:hover": { backgroundColor: "#5e4f4f" },
                            }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <ToastProvider />
        </>
    );
};

export default RegisterPage;
