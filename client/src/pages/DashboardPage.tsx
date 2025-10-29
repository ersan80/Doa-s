import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/Order`).then((res) => setOrders(res.data));
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>All Orders</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((o: any) => (
                        <TableRow key={o.id}>
                            <TableCell>{o.id}</TableCell>
                            <TableCell>{o.userId}</TableCell>
                            <TableCell>${o.total.toFixed(2)}</TableCell>
                            <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
