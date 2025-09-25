
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box, TextField, Button, Typography, Container, Paper
} from '@mui/material';
import ToastProvider from './ToastContainer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from 'react-router';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!registerData.name || !registerData.email || !registerData.password) {
            toast.error("Please fill all fields.");
            return;
        }

        if (registerData.password !== confirmPassword) {
            toast.error('Passwords do not match!', { autoClose: 3000 });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/Register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Name: registerData.name,
                    Email: registerData.email,
                    Password: registerData.password
                })
            });

            const data = await response.json();
            console.log(data)
            if (response.ok && data.success) {
                toast.success('Register Success!', { autoClose: 3000 });
                setRegisterData({ name: '', email: '', password: '' });
                setConfirmPassword('');
            } else {
                toast.error(data.message || 'Register failed. Please try again.', { autoClose: 3000 });
            }
        } catch (error: unknown) {
            console.error('Register Error:', error);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
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

                        <TextField
                            label="Confirm Password"
                            required
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            error={confirmPassword !== '' && confirmPassword !== registerData.password}
                            helperText={
                                confirmPassword !== '' && confirmPassword !== registerData.password
                                    ? 'Passwords do not match'
                                    : ''
                            }
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
                            Already have an account?{" "}
                            <Button
                                component={NavLink}
                                to="/login"
                                variant="text"
                                sx={{ textTransform: "none" }}
                            >
                                Login
                            </Button>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <ToastProvider />
        </>
    );
};

export default RegisterPage;
