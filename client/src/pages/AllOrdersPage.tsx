import { useState, useEffect, useMemo } from "react";
import {
    Box,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function AllOrdersPage() {
    const { items, hydrated, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const { email } = useAuth();

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);

    useEffect(() => {
        if (!hydrated) return;
        // sadece sepette ürün YOKSA ve sipariş sayfasında DEĞİLSE yönlendir
        if (items.length === 0 && window.location.pathname !== "/orders") {
            navigate("/shop");
        }
    }, [hydrated, items.length, navigate]);


    if (!hydrated) {
        return <Box sx={{ p: 4 }}>Loading your cart...</Box>;
    }

    const subtotal = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );

    const total = useMemo(
        () => Math.max(0, subtotal - discountValue),
        [subtotal, discountValue]
    );

    const handleApplyDiscount = () => {
        if (discountCode.trim().toUpperCase() === "WELCOME10") {
            setDiscountValue(parseFloat((subtotal * 0.1).toFixed(2)));
        } else {
            setDiscountValue(0);
        }
    };

    const handleSubmit = async () => {
        if (!fullName || !address || !city || !state || !zip || !phone) {
            alert("Please fill in all required fields.");
            return;
        }

        const orderData = {
            userId: email ?? "guest",
            customerName: fullName,
            address: `${address}${apt ? ", " + apt : ""}, ${city}, ${state} ${zip}`,
            phone,
            status: "Pending",
            items: items.map((i) => ({
                productId: i.id,
                productName: i.name,
                imageUrl: i.imageUrl ?? "",
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
            navigate("/orders", { replace: true });
        } catch (err) {
            console.error(err);
            alert("Failed to create order.");
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                wrap="nowrap"
                sx={{
                    flexDirection: { xs: "column", md: "row" },
                    overflow: "hidden",
                }}
            >
                {/* LEFT — ORDER SUMMARY */}
                <Grid
                    sx={{
                        xs: 12, md: 5,
                        flexBasis: { md: "40%" },
                        flexShrink: 0,
                        backgroundColor: "#fafafa",
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 1,
                        position: { md: "sticky" },
                        top: { md: 20 },
                        maxHeight: { md: "85vh" },
                        overflowY: { md: "auto", xs: "visible" },
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#b18a5a",
                            borderRadius: "4px",
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                        sx={{
                            mb: 2,
                            color: "#a75e22",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                        }}
                    >
                        Order Summary
                    </Typography>

                    {items.map((item) => (
                        <Card
                            key={item.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 2,
                                p: 1,
                                borderRadius: 2,
                                background: "white",
                                boxShadow: 0,
                                transition: "transform 0.2s ease",
                                "&:hover": {
                                    transform: "scale(1.02)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 1,
                                        objectFit: "cover",
                                        mr: 2,
                                    }}
                                    image={
                                        item.imageUrl
                                            ? `${API_IMAGES_URL}/${item.imageUrl}`
                                            : "/placeholder.jpg"
                                    }
                                    alt={item.name}
                                />
                                <CardContent sx={{ p: 0 }}>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.quantity} × ${item.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() =>
                                        item.quantity > 1
                                            ? updateQuantity(item.id, item.quantity - 1)
                                            : removeFromCart(item.id)
                                    }
                                    sx={{ p: 0.5 }}
                                >
                                    <Remove fontSize="small" />
                                </IconButton>

                                <Typography
                                    variant="body2"
                                    fontWeight={700}
                                    sx={{ minWidth: 20, textAlign: "center" }}
                                >
                                    {item.quantity}
                                </Typography>

                                <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    sx={{ p: 0.5 }}
                                >
                                    <Add fontSize="small" />
                                </IconButton>

                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => removeFromCart(item.id)}
                                    sx={{ p: 0.5, ml: 0.5 }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                        </Card>
                    ))}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            fullWidth
                            label="Discount Code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            size="small"
                        />
                        <Button
                            variant="outlined"
                            onClick={handleApplyDiscount}
                            sx={{
                                color: "#5e3d1e",
                                borderColor: "#5e3d1e",
                                "&:hover": {
                                    backgroundColor: "#5e3d1e",
                                    color: "#fff",
                                },
                            }}
                        >
                            Apply
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
                        {discountValue > 0 && (
                            <Typography color="success.main">
                                Discount: -${discountValue.toFixed(2)}
                            </Typography>
                        )}
                        <Typography variant="h6" fontWeight={800} sx={{ mt: 1 }}>
                            Total: ${total.toFixed(2)}
                        </Typography>
                    </Box>
                </Grid>

                {/* RIGHT — CONTACT FORM */}
                <Grid
                    sx={{
                        xs: 12,
                        md: 7,
                        flexBasis: { md: "60%" },
                        flexShrink: 0,
                    }}
                >
                    <Box
                        sx={{
                            p: { xs: 2, md: 4 },
                            borderRadius: 3,
                            boxShadow: 1,
                            backgroundColor: "white",
                            minHeight: { md: "80vh" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": { boxShadow: 3 },
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                gutterBottom
                                sx={{
                                    color: "#a75e22",
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            >
                                Contact & Delivery
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid sx={{ xs: 12 , md:6 }}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12,md:6 }}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12, md:6 }}>
                                    <TextField
                                        fullWidth
                                        label="Apartment, suite, etc. (optional)"
                                        value={apt}
                                        onChange={(e) => setApt(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12,md:6 }}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="ZIP Code"
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 4,
                                py: 1.7,
                                fontSize: "1.1rem",
                                background: "linear-gradient(135deg, #6f4e37, #c49b63)",
                                color: "white",
                                fontWeight: 700,
                                letterSpacing: 0.5,
                                textTransform: "uppercase",
                                borderRadius: 2,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #5c3c2a, #d1a25a)",
                                    transform: "scale(1.02)",
                                    boxShadow: "0px 4px 15px rgba(96, 64, 40, 0.3)",
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            Complete Order
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
