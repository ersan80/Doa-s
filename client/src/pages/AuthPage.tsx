
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS'i
import {
    Box, TextField, Button, Typography, Container, Alert,
    Paper
} from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import ToastProvider from './ToastContainer';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginData {
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

const AuthPage: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Backend'e POST isteği (örnek .NET API endpoint'i)
        fetch('http://localhost:5126/api/Auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        })
            .then(response => response.json() as Promise<ApiResponse>)
            .then(data => {
                if (data.success) {
                    console.log('Entry succsess:', data);
                    toast.success('Entry Success', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setLoginData({ email: '', password: '' });
                    setError('');
                } else {
                    setError(data.message || 'Entry failed. Please try again.');
                    toast.error(data.message || 'Entry failed. Please try again.', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            })
            .catch(error => {
                setError('Something went wrong. Please try again later.');
                console.error('Hata:', error);
            });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
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
                            Login
                        </Typography>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}
                        <TextField
                            label="E-mail"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            value={loginData.email}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                        <TextField
                            label="Password"
                            name="password"
                            required
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={loginData.password}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
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
                            Login
                        </Button>
                        <Typography variant="body2">
                            Don't you have an account? <a href="/register">Sign Up</a>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <ToastProvider
            />
        </>
    );
};

export default AuthPage;