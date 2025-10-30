import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Collapse,
    Divider,
    Chip,
    Stack,
    CircularProgress,
    Pagination,
} from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    imageUrl?: string;
}

interface Order {
    id: number;
    customerName: string;
    address: string;
    phone: string;
    status: string;
    items: OrderItem[];
    createdAt: string;
}

export default function UserOrdersPage() {
    const { email } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // 🧭 Pagination state
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const pageCount = Math.ceil(orders.length / itemsPerPage);
    const paginatedOrders = orders.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" }); // yukarı kaydır
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/order/user/${email}`);
                // Siparişleri tarih sırasına göre (yeniden eskiye) sırala
                setOrders(
                    res.data.sort(
                        (a: Order, b: Order) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [email]);

    const renderStatusChip = (status: string) => {
        const lower = status.toLowerCase();
        switch (lower) {
            case "pending":
                return <Chip label="Order Pending" color="warning" />;
            case "approved":
                return <Chip label="Order Approved" color="info" />;
            case "preparing":
                return <Chip label="Preparing Order" color="secondary" />;
            case "shipped":
                return <Chip label="Shipped" color="primary" />;
            case "completed":
                return <Chip label="Completed 🎉" color="success" />;
            case "cancelled":
                return <Chip label="Cancelled" color="error" />;
            default:
                return <Chip label={status} />;
        }
    };

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );

    if (!orders.length)
        return (
            <Typography sx={{ mt: 5, textAlign: "center", color: "text.secondary" }}>
                You don’t have any orders yet.
            </Typography>
        );

    return (
        <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
            <Typography
                variant="h4"
                fontWeight={600}
                gutterBottom
                sx={{ color: "#6f4e37" }}
            >
                My Orders
            </Typography>

            {paginatedOrders.map((order) => (
                <Card key={order.id} sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            <Typography variant="h6" fontWeight={600}>
                                Order #{order.id}
                            </Typography>
                            {renderStatusChip(order.status)}
                        </Stack>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Placed on:{" "}
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* İlk ürünü göster */}
                        {order.items.length > 0 && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 90, height: 90, borderRadius: 1 }}
                                    image={
                                        order.items[0].imageUrl
                                            ? `${API_IMAGES_URL}/${order.items[0].imageUrl}`
                                            : "/placeholder.jpg"
                                    }
                                    alt={order.items[0].productName}
                                />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {order.items[0].productName}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {order.items[0].quantity} × ${order.items[0].price.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Button
                            variant="text"
                            endIcon={
                                expandedId === order.id ? <ExpandLessIcon /> : <ExpandMoreIcon />
                            }
                            sx={{ mt: 2 }}
                            onClick={() => handleExpand(order.id)}
                        >
                            {expandedId === order.id ? "Hide Details" : "View Details"}
                        </Button>

                        <Collapse in={expandedId === order.id}>
                            <Box sx={{ mt: 2 }}>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Order Items
                                </Typography>

                                {order.items.map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                            gap: 2,
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 80, height: 80, borderRadius: 1 }}
                                            image={
                                                item.imageUrl
                                                    ? `${API_IMAGES_URL}/${item.imageUrl}`
                                                    : "/placeholder.jpg"
                                            }
                                            alt={item.productName}
                                        />
                                        <Box>
                                            <Typography fontWeight={600}>{item.productName}</Typography>
                                            <Typography color="text.secondary">
                                                {item.quantity} × ${item.price.toFixed(2)}
                                            </Typography>
                                            <Typography fontWeight={600}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body1">
                                    <strong>Customer:</strong> {order.customerName}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Address:</strong> {order.address}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Phone:</strong> {order.phone}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    color="success.main"
                                    sx={{ mt: 2 }}
                                >
                                    Total: $
                                    {order.items
                                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                        .toFixed(2)}
                                </Typography>
                            </Box>
                        </Collapse>
                    </CardContent>
                </Card>
            ))}

            {/* ✅ Pagination component */}
            {pageCount > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#6f4e37",
                                fontWeight: 600,
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#6f4e37 !important",
                                color: "#fff !important",
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}
