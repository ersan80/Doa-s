import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Chip } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UserOrdersPage() {
    const { email } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/order`).then((res) => {
            const userOrders = res.data.filter((o: any) => o.userId === email);
            setOrders(userOrders);
        });
    }, [email]);

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "Pending":
                return "✅ Siparişiniz alındı, onay bekliyor.";
            case "Preparing":
                return "☕ Siparişiniz hazırlanıyor...";
            case "Shipped":
                return "🚚 Siparişiniz kargoya verildi!";
            case "Completed":
                return "🎉 Siparişiniz tamamlandı!";
            default:
                return status;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Siparişlerim
            </Typography>
            {orders.map((o) => (
                <Box
                    key={o.id}
                    sx={{
                        border: "1px solid #eee",
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    <Typography variant="h6">#{o.id} - {o.customerName}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        {o.address} • {o.phone}
                    </Typography>
                    <Chip
                        label={getStatusLabel(o.status)}
                        color={
                            o.status === "Pending"
                                ? "warning"
                                : o.status === "Preparing"
                                    ? "info"
                                    : o.status === "Shipped"
                                        ? "primary"
                                        : "success"
                        }
                    />
                </Box>
            ))}
        </Box>
    );
}
