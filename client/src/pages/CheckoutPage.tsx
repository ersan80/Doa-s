import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import AddressSelector from "../components/AddressSelector";
import { Address } from "../model/UserTypes";
import AllOrderPage from "./AllOrdersPage";

export default function CheckoutPage() {
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
                variant="h4"
                sx={{ color: "#6b4a2b", fontWeight: 700, mb: 1 }}
            >
                Checkout
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <AddressSelector onSelected={(addr) => setSelectedAddress(addr)} />

            <Box sx={{ mt: 3 }}>
                <AllOrderPage selectedAddress={selectedAddress} />
            </Box>
        </Box>
    );
}
