import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    TextField,
    Button,
    Grid,
    IconButton,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import { Edit, Delete, PhotoCamera } from "@mui/icons-material";
import { fetchJson } from "../utils/fetchJson";

interface Address {
    id: number;
    line1: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
    defaultAddress?: string;
    addresses?: Address[];
}

const UserInfoPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [editAddress, setEditAddress] = useState<Address | null>(null);

    // ✅ Kullanıcıyı backend'den çek
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await fetchJson<User>(
                    `${import.meta.env.VITE_API_BASE_URL}/user`
                );
                setUser(data);
                setFullName(data.name || "");
                setDefaultAddress(data.defaultAddress || "");
                setAddresses(data.addresses || []);
            } catch (err) {
                console.error("fetch user failed", err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    // ✅ Profil kaydet (isim, varsayılan adres, avatar)
    const handleSave = async () => {
        if (!user) return;
        const formData = new FormData();
        formData.append("FullName", fullName);
        formData.append("DefaultAddress", defaultAddress);
        if (avatar) formData.append("Avatar", avatar);

        await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        alert("Profile updated successfully!");
    };

    // ✅ Adres ekle veya düzenle
    const handleSaveAddress = async () => {
        if (!user) return;
        if (editAddress?.id) {
            // update
            await fetchJson(
                `${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address/${editAddress.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(editAddress),
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            // add new
            await fetchJson(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address`, {
                method: "POST",
                body: JSON.stringify(editAddress),
                headers: { "Content-Type": "application/json" },
            });
        }
        alert("Address saved successfully!");
    };

    // ✅ Adres sil
    const handleDeleteAddress = async (id: number) => {
        if (!user) return;
        await fetchJson(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address/${id}`, {
            method: "DELETE",
        });
        setAddresses(addresses.filter((a) => a.id !== id));
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!user) return <Typography>No user found.</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ color: "#6b4a2b", mb: 2, fontWeight: 700 }}>
                My Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Avatar */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar
                    src={
                        user.avatarUrl
                            ? `${import.meta.env.VITE_API_BASE_URL}/${user.avatarUrl}`
                            : undefined
                    }
                    sx={{ width: 120, height: 120, bgcolor: "#b38b59" }}
                >
                    {!user.avatarUrl && user.name?.[0]?.toUpperCase()}
                </Avatar>
                <IconButton color="primary" component="label">
                    <PhotoCamera />
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                    />
                </IconButton>
            </Box>

            {/* Profile info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Default Address"
                        value={defaultAddress}
                        onChange={(e) => setDefaultAddress(e.target.value)}
                    />
                </Grid>
            </Grid>

            <Button
                onClick={handleSave}
                fullWidth
                sx={{
                    mt: 2,
                    background: "linear-gradient(to right, #6b4a2b, #b38b59)",
                    color: "#fff",
                    fontWeight: 600,
                    py: 1.2,
                    "&:hover": { opacity: 0.9 },
                }}
            >
                Save Changes
            </Button>

            {/* Address Section */}
            <Typography variant="h5" sx={{ mt: 5, mb: 2, color: "#6b4a2b", fontWeight: 600 }}>
                My Addresses
            </Typography>

            <Grid container spacing={2}>
                {addresses.map((address) => (
                    <Grid item xs={12} md={6} key={address.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">{address.line1}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {address.city}, {address.state} {address.zip}
                                </Typography>
                                <Typography variant="body2">📞 {address.phone}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton onClick={() => setEditAddress(address)} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteAddress(address.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserInfoPage;
