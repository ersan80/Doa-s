import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Chip,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const { token } = useAuth();

    const fetchOrders = async () => {
        const res = await axios.get(`${API_BASE_URL}/order`);
        setOrders(res.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: number, status: string) => {
        await axios.put(`${API_BASE_URL}/order/${id}/status`, JSON.stringify(status), {
            headers: { "Content-Type": "application/json" },
        });
        fetchOrders();
    };

    const nextStatus = (current: string) => {
        switch (current) {
            case "Pending":
                return "Preparing";
            case "Preparing":
                return "Shipped";
            case "Shipped":
                return "Completed";
            default:
                return "Completed";
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                📦 Orders Dashboard
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((o) => (
                        <TableRow key={o.id}>
                            <TableCell>{o.id}</TableCell>
                            <TableCell>{o.customerName}</TableCell>
                            <TableCell>{o.address}</TableCell>
                            <TableCell>{o.phone}</TableCell>
                            <TableCell>${Number(o.totalPrice ?? o.total ?? 0).toFixed(2)}</TableCell>
                            <TableCell>
                                <Chip
                                    label={o.status}
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
                            </TableCell>
                            <TableCell>
                                {o.status !== "Completed" && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => updateStatus(o.id, nextStatus(o.status))}
                                    >
                                        {nextStatus(o.status)}
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
