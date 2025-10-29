import { useEffect, useState } from "react";
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
    const {items} = useCart();
    const navigate = useNavigate();
    const { email } = useAuth();

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 🧾 Kullanıcı bilgileri
    const [customerName, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (items.length === 0) {
            alert("Sepetiniz boş!");
            navigate("/shop");
        }
    }, [items]);

    // ✅ Backend’den ürünleri çek
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/products`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // 🛒 Şimdilik tüm ürünleri sepet olarak göster (ileride Cart sistemi eklenecek)
    const cartItems = products.slice(0, 2); // test amaçlı ilk 2 ürün
    const total = cartItems.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0);

    const handleSubmit = async () => {
        if (!customerName || !address || !phone) {
            alert("Lütfen tüm bilgileri doldurun.");
            return;
        }

        const orderData = {
            userId: email ?? "guest",
            customerName,
            address,
            phone,
            status: "Pending",
            items: cartItems.map((i) => ({
                productId: i.id,
                productName: i.name,
                quantity: i.quantity ?? 1,
                price: i.price,
            })),
        };

        try {
            await axios.post(`${API_BASE_URL}/order`, orderData, {
                headers: { "Content-Type": "application/json" },
            });
            alert("☕ Siparişiniz başarıyla oluşturuldu!");
            navigate("/orders");
        } catch (error) {
            console.error(error);
            alert("Sipariş oluşturulamadı!");
        }
    };

    if (loading)
        return (
            <Typography sx={{ mt: 4, textAlign: "center" }}>
                Ürünler yükleniyor...
            </Typography>
        );

    return (
        <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
                Siparişi Tamamla
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom>
                Teslimat Bilgileri
            </Typography>

            <TextField
                label="Ad Soyad"
                fullWidth
                margin="normal"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
            <TextField
                label="Adres"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
                label="Telefon"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
                Sepet Özeti
            </Typography>

            {cartItems.length === 0 ? (
                <Typography color="text.secondary">Sepetiniz boş.</Typography>
            ) : (
                cartItems.map((item) => (
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
                                {item.quantity ?? 1} × ${item.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Toplam: ${total.toFixed(2)}</Typography>

            <Button
                variant="contained"
                color="success"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleSubmit}
            >
                Siparişi Tamamla
            </Button>
        </Box>
    );
}
