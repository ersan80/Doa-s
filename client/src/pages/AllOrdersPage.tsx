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
    Tooltip,
} from "@mui/material";
import { Add, Remove, Delete, Star, StarBorder } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Address } from "../model/UserTypes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

interface AllOrdersPageProps {
    /** CheckoutPage'den geliyor: AddressSelector seçimi */
    selectedAddress?: Address | null;
}

export default function AllOrdersPage({ selectedAddress }: AllOrdersPageProps) {
    const { items, hydrated, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const { email } = useAuth();

    // Form state
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");

    // Discount
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);

    // Kayıtlı adres etiketleri (localStorage tarafı)
    const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
    const [defaultAddress, setDefaultAddress] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState(false);

    // Sepet boşsa shop'a
    // ✅ sepette ürün yoksa, ama sipariş tamamlanmadıysa yönlendir
    // 🚫 Sadece kullanıcı checkout’tayken ve sipariş gönderilmiyorken yönlendir
    // ✅ sepette ürün yoksa ama sipariş tamamlanmadıysa yönlendirme
    useEffect(() => {
        if (!hydrated) return;

        // sadece checkout sayfasında geçerli
        const isCheckoutPage = window.location.pathname === "/checkout";

        // 🧩 submitting true ise bu blok hiç çalışmasın
        if (isCheckoutPage && !submitting && items.length === 0) {
            // kullanıcı yanlışlıkla checkout'a boş sepetle gelmişse
            navigate("/checkout", { replace: true } );
        }
    }, [hydrated, items.length, navigate, submitting]);




    // Kullanıcı profilinden isim + savedAddresses + defaultAddress
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("userProfile") || "{}");
        if (stored.email === email) {
            setFullName(stored.name || "");
            setSavedAddresses(stored.savedAddresses || []);
            if (stored.defaultAddress) {
                setAddress(stored.defaultAddress);
                setDefaultAddress(stored.defaultAddress);
            }
        }
    }, [email]);

    // AddressSelector seçtiğinde formu otomatik doldur
    useEffect(() => {
        if (!selectedAddress) return;
        setAddress(selectedAddress.line1 || "");
        setCity(selectedAddress.city || "");
        setState(selectedAddress.state || "");
        setZip(selectedAddress.zip || "");
        setPhone(selectedAddress.phone || "");
        setApt(selectedAddress.apartment ?? "");
    }, [selectedAddress]);

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
            const val = parseFloat((subtotal * 0.1).toFixed(2));
            setDiscountValue(val);
            toast.success("Discount applied: 10% off!");
        } else {
            setDiscountValue(0);
            toast.error("Invalid discount code");
        }
    };

    const handleSetDefaultAddress = (addr: string) => {
        setDefaultAddress(addr);
        const stored = JSON.parse(localStorage.getItem("userProfile") || "{}");
        if (stored.email === email) {
            stored.defaultAddress = addr;
            localStorage.setItem("userProfile", JSON.stringify(stored));
            toast.info("Default address updated");
            // Event: header ve diğer yerler güncellesin
            window.dispatchEvent(new Event("profile-updated"));
        }
    };

    // Basit zorunlu alan kontrolü
    const isFormValid = () => {
        return (
            fullName.trim() &&
            address.trim() &&
            city.trim() &&
            state.trim() &&
            zip.trim() &&
            phone.trim()
        );
    };

    const buildAddressLine = () => {
        const aptPart = apt ? `, ${apt}` : "";
        return `${address}${aptPart}, ${city}, ${state} ${zip}`.trim();
    };
    const handleSubmit = async () => {
        // Basic form validation
        if (!isFormValid()) {
            toast.error("Please fill in all required fields before completing your order.");
            return;
        }

        // Prevent submitting empty cart
        if (items.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        const orderData = {
            userId: email ?? "guest",
            customerName: fullName,
            address: buildAddressLine(),
            phone,
            status: "Pending",
            items: items.map((i) => ({
                productId: i.id,
                productName: i.name,
                imageUrl: i.imageUrl ?? "",
                quantity: i.quantity,
                price: i.price,
            })),
            discountCode: discountValue > 0 ? "WELCOME10" : null,
            discountValue,
            subtotal,
            total,
        };

        try {
            setSubmitting(true);

            const res = await axios.post(`${API_BASE_URL}/order`, orderData, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 200) {
                // ✅ Show success message first
                toast.success(
                    "☕️ Your order has been placed successfully! We're preparing your shipment. You’ll be redirected to 'My Orders' shortly.",
                    {
                        position: "top-center",
                        autoClose: 5000,
                        pauseOnHover: false,
                        draggable: false,
                        closeOnClick: true,
                        theme: "colored",
                    }
                );

                // ✅ Clear the cart after 1.5 seconds (so the toast appears first)
                setTimeout(() => {
                    clearCart();
                }, 1500);

                // ✅ Navigate to 'My Orders' after 5 seconds
                setTimeout(() => {
                    navigate("/orders", { replace: true });
                }, 5000);
            } else {
                toast.error("Unexpected server response. Please try again.");
            }
        } catch (err) {
            console.error("❌ Order submission error:", err);
            toast.error("Failed to create order. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };




    if (!hydrated) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography>Loading your cart…</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
            <ToastContainer position="top-right" autoClose={2000} theme="colored" />

            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                wrap="nowrap"
                sx={{ flexDirection: { xs: "column", md: "row" }, overflow: "hidden" }}
            >
                {/* LEFT — ORDER SUMMARY */}
                <Grid
                    sx={{
                        xs: 12,
                        md: 5,
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
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                        sx={{ mb: 2, color: "#a75e22", textTransform: "uppercase" }}
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
                                "&:hover": { transform: "scale(1.02)" },
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
                                        item.imageUrl ? `${API_IMAGES_URL}/${item.imageUrl}` : "/placeholder.jpg"
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
                                >
                                    <Add fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => removeFromCart(item.id)}
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
                                "&:hover": { backgroundColor: "#5e3d1e", color: "#fff" },
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

                {/* RIGHT — CONTACT & DELIVERY */}
                <Grid sx={{ xs: 12, md: 7, flexBasis: { md: "60%" } }}>
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
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                gutterBottom
                                sx={{ color: "#a75e22", textTransform: "uppercase" }}
                            >
                                Contact & Delivery
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid sx={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Grid>

                                <Grid sx={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    {savedAddresses.length > 0 && (
                                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {savedAddresses.map((addr, i) => (
                                                <Button
                                                    key={i}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        textTransform: "none",
                                                        borderColor: "#6f4e37",
                                                        color: "#6f4e37",
                                                        "&:hover": { bgcolor: "#f3ece6" },
                                                    }}
                                                    onClick={() => setAddress(addr)}
                                                    endIcon={
                                                        addr === defaultAddress ? (
                                                            <Tooltip title="Default Address">
                                                                <Star sx={{ color: "#c49b63" }} />
                                                            </Tooltip>
                                                        ) : (
                                                            <Tooltip title="Set as Default">
                                                                <StarBorder
                                                                    sx={{ color: "#b5a08a", cursor: "pointer" }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleSetDefaultAddress(addr);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        )
                                                    }
                                                >
                                                    {addr}
                                                </Button>
                                            ))}
                                        </Box>
                                    )}
                                </Grid>

                                <Grid sx={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Apartment, suite, etc. (optional)"
                                        value={apt}
                                        onChange={(e) => setApt(e.target.value)}
                                    />
                                </Grid>
                                <Grid sx={{ xs: 12, md: 6 }}>
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
                            disabled={submitting}
                            sx={{
                                mt: 4,
                                py: 1.7,
                                fontSize: "1.1rem",
                                background: "linear-gradient(135deg, #6f4e37, #c49b63)",
                                color: "white",
                                fontWeight: 700,
                                borderRadius: 2,
                                "&:hover": {
                                    background: "linear-gradient(135deg, #5c3c2a, #d1a25a)",
                                    transform: "scale(1.02)",
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            {submitting ? "Placing Order…" : "Complete Order"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
