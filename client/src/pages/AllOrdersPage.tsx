import { Box, Button, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // kullanıcı bilgisi
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AllOrdersPage() {
    const { items, updateQuantity, removeFromCart, clearCart } = useCart();
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const { email, token } = useAuth();
    const handleCheckout = async () => {
        try {
            const orderData = {
                userId: email ?? "guest",
                items: items.map((i) => ({
                    productId: i.id,
                    productName: i.name,
                    quantity: i.quantity,
                    price: i.price,
                })),
            };

            await axios.post(`${API_BASE_URL}/Order`, orderData);
            alert("Order created successfully!");
            clearCart(); // ✅ sepet temizlenir
        } catch (err) {
            console.error(err);
            alert("Order failed.");
        }
    };
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Your Cart</Typography>
            {items.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    {items.map((i) => (
                        <Box
                            key={i.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography>{i.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Button onClick={() => updateQuantity(i.id, i.quantity - 1)}>-</Button>
                                <Typography>{i.quantity}</Typography>
                                <Button onClick={() => updateQuantity(i.id, i.quantity + 1)}>+</Button>
                            </Box>
                            <Typography>${(i.price * i.quantity).toFixed(2)}</Typography>
                            <Button color="error" onClick={() => removeFromCart(i.id)}>
                                Remove
                            </Button>
                        </Box>
                    ))}
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Total: ${total.toFixed(2)}
                    </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            disabled={!items.length}
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>

                    <Button variant="text" color="secondary" sx={{ mt: 1 }} onClick={clearCart}>
                        Clear Cart
                    </Button>
                </>
            )}
        </Box>
    );
}
