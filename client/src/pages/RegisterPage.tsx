import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box, TextField, Button, Typography, Container,
    Paper
} from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import ToastProvider from './ToastContainer';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
}

const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const RegisterPage: React.FC = () => {
    const [registerData, setRegisterData] = useState<RegisterData>({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(`${API_BASE_URL}/Auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData),
        })
            .then(response => response.json() as Promise<ApiResponse>)
            .then(data => {
                if (data.success) {
                    toast.success('Register Success!', { autoClose: 3000 });
                    setRegisterData({ name: '', email: '', password: '' });
                } else {
                    toast.error(data.message || 'Register failed. Please try again.', { autoClose: 3000 });
                }
            })
            .catch(() => {
                toast.error('Something went wrong. Please try again later.');
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <GlobalFont />
            <Container maxWidth="xs" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            Register
                        </Typography>

                        <TextField
                            label="Full Name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            value={registerData.name}
                            onChange={handleChange}
                        />

                        <TextField
                            label="E-mail"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            value={registerData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            required
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={registerData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <Box
                                        onClick={() => setShowPassword(!showPassword)}
                                        sx={{ cursor: 'pointer', mr: 1 }}
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
                            sx={{ mt: 3, mb: 2, backgroundColor: '#7d6c6c', '&:hover': { backgroundColor: '#5e4f4f' } }}
                        >
                            Register
                        </Button>
                        <Typography variant="body2">
                            Already have an account? <a href="/login">Login</a>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <ToastProvider />
        </>
    );
};

export default RegisterPage;
