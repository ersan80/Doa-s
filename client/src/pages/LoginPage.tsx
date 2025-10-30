import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    CircularProgress,
} from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ToastProvider from "./ToastContainer";
import { fetchJson } from "../utils/fetchJson";
import { showSuccess, showError } from "../utils/toastHelper";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext"; // Doğru import

interface LoginData {
    email: string;
    password: string;
}

const GlobalFont = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const LoginPage = () => {
    const { login } = useAuth(); // context/AuthContext.tsx’ten geliyor
    const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (searchParams.get("confirmed") === "true") {
            showSuccess("Email confirmed! Please log in.");
        }
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const data = await fetchJson<{
                success: boolean;
                message?: string;
                email: string;
                name: string;
                token: string;
            }>(`${API_BASE_URL}/Auth/login`, {
                method: "POST",
                body: JSON.stringify(loginData),
            });
            if (data.success && data.token) {
                login({ email: data.email, token: data.token, emailConfirmed: true });
                showSuccess("Entry Success 🎉");
                setLoginData({ email: "", password: "" });
                navigate("/home", { replace: true });
            } else {
                showError(data.message || "Entry failed. Please try again.");
            }
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {

                showError(error.message || "Server error, please try again later.");
            } else {
                showError("Server error, please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <GlobalFont />
            <Container maxWidth="xs" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            Login
                        </Typography>
                        <TextField
                            label="E-mail"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            required
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <Box
                                        onClick={() => setShowPassword(!showPassword)}
                                        sx={{ cursor: "pointer", mr: 1 }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Box>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#7d6c6c",
                                "&:hover": { backgroundColor: "#5e4f4f" },
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
                        </Button>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Button component={NavLink} to="/register" variant="text" sx={{ textTransform: "none" }}>
                                Sign Up
                            </Button>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <ToastProvider />
        </>
    );
};

export default LoginPage;
