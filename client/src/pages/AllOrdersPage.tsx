import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function AllOrdersPage() {
    const { items, clearCart } = useCart();
    const navigate = useNavigate();
    const { email } = useAuth();

    const [customerName, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (items.length === 0) {
            alert("Your cart is empty!");
            navigate("/shop");
        }
    }, [items, navigate]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = async () => {
        if (!customerName || !address || !phone) {
            alert("Please fill in all required fields.");
            return;
        }

        const orderData = {
            userId: email ?? "guest",
            customerName,
            address,
            phone,
            status: "Pending",
            items: items.map((i) => ({
                productId: i.id,
                productName: i.name,
                quantity: i.quantity,
                price: i.price,
            })),
        };

        try {
            await axios.post(`${API_BASE_URL}/order`, orderData, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Your order has been placed successfully!");
            clearCart();
            navigate("/orders");
        } catch (error) {
            console.error(error);
            alert("Failed to create order.");
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
                Complete Your Order
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom>
                Shipping Information
            </Typography>

            <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
            <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
                label="Phone"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
                Cart Summary
            </Typography>

            {items.length === 0 ? (
                <Typography color="text.secondary">Your cart is empty.</Typography>
            ) : (
                items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: "flex",
                            mb: 2,
                            borderRadius: 2,
                            boxShadow: 1,
                            overflow: "hidden",
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: 120, height: 120, objectFit: "cover" }}
                            image={
                                item.imageUrl
                                    ? `${API_IMAGES_URL}/${item.imageUrl}`
                                    : "/placeholder.jpg"
                            }
                            alt={item.name}
                        />
                        <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.quantity} × ${item.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

            <Button
                variant="contained"
                color="success"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleSubmit}
            >
                Place Order
            </Button>
        </Box>
    );
}
