// src/pages/UserInfoPage.tsx
import { useEffect, useMemo, useState } from "react";
import {
    Box, Typography, Avatar, TextField, Button, Grid, IconButton, Divider,
    Tabs, Tab, MenuItem, Stack, Card, CardContent
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchJson } from "../utils/fetchJson";
import { Address, User } from "../model/UserTypes";
import AddressDialog from "../components/AddressDialog";
import { useAuth } from "../context/AuthContext";

export default function UserInfoPage() {
    const { refreshUser } = useAuth();
    const [tab, setTab] = useState(0);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [fullName, setFullName] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState<Address | null>(null);

    const load = async () => {
        try {
            const u = await fetchJson<User>(`${import.meta.env.VITE_API_BASE_URL}/user`);
            setUser(u);
            setFullName(u.name || "");
            setDefaultAddress(u.defaultAddress || "");
            setAddresses(u.addresses || []);
        } catch (e) {
            console.error("fetch user failed", e);
            toast.error("Could not load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const avatarUrl = useMemo(() => {
        if (!user?.avatarUrl) return "";
        // backend "/uploads/xxx.png" döndürüyor → tam URL yap + cache-bust
        const base = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
        return `${base}${user.avatarUrl}?v=${user.id}-${Date.now()}`;
    }, [user?.avatarUrl, user?.id]);

    const handleSaveProfile = async () => {
        if (!user) return;
        const form = new FormData();
        form.append("FullName", fullName);
        form.append("DefaultAddress", defaultAddress);
        if (avatar) form.append("Avatar", avatar);

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
            body: form,
        });

        if (!res.ok) { toast.error("Profile update failed"); return; }

        const updated = await res.json();
        setUser(updated);
        localStorage.setItem("userProfile", JSON.stringify(updated));
        window.dispatchEvent(new Event("profile-updated"));
        refreshUser?.();
        toast.success("Profile updated");
    };

    const upsertAddress = async (data: Omit<Address, "id"> | Address) => {
        if (!user) return;
        if ("id" in data) {
            const updated = await fetchJson<Address>(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            setAddresses(prev => prev.map(a => (a.id === updated.id ? updated : a)));
            toast.success("Address updated");
        } else {
            const created = await fetchJson<Address>(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            setAddresses(prev => [...prev, created]);

            // İstersen defaultAddress alanını otomatik doldur:
            if (!defaultAddress) setDefaultAddress(`${created.line1}, ${created.city}`);
            toast.success("Address added");
        }
    };

    const removeAddress = async (id: number) => {
        if (!user) return;
        await fetchJson(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address/${id}`, { method: "DELETE" });
        setAddresses(prev => prev.filter(a => a.id !== id));
        toast.success("Address deleted");
    };

    if (loading) return <Typography sx={{ p: 3 }}>Loading…</Typography>;
    if (!user) return <Typography sx={{ p: 3 }}>No user found.</Typography>;

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ color: "#6b4a2b", fontWeight: 700, mb: 1 }}>
                My Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Avatar */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                <Avatar src={avatarUrl || undefined} alt={user.name} sx={{ width: 120, height: 120, bgcolor: "#b38b59" }}>
                    {!avatarUrl && user.name?.[0]?.toUpperCase()}
                </Avatar>
                <IconButton color="primary" component="label" sx={{ mt: 1 }}>
                    <PhotoCamera />
                    <input hidden type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
                </IconButton>
            </Box>

            {/* Tabs */}
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                <Tab label="Profile Info" />
                <Tab label="My Addresses" />
            </Tabs>

            {tab === 0 && (
                <Box>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={6}>
                            <TextField label="Full Name" fullWidth value={fullName} onChange={e => setFullName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Default Address"
                                fullWidth
                                value={defaultAddress}
                                onChange={e => setDefaultAddress(e.target.value)}
                                helperText="Used as your default shipping address"
                            >
                                <MenuItem value="">None</MenuItem>
                                {addresses.map(a => (
                                    <MenuItem key={a.id} value={`${a.line1}, ${a.city}`}>
                                        {a.line1}, {a.city}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Button
                        onClick={handleSaveProfile}
                        fullWidth
                        sx={{
                            mt: 1.5,
                            background: "linear-gradient(to right, #6b4a2b, #b38b59)",
                            color: "#fff", fontWeight: 600, py: 1.2,
                            "&:hover": { opacity: 0.9 },
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            )}

            {tab === 1 && (
                <Box>
                    <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => { setEdit(null); setOpenDialog(true); }}
                            sx={{ bgcolor: "#6b4a2b", "&:hover": { bgcolor: "#553a21" } }}
                        >
                            Add New Address
                        </Button>
                    </Stack>

                    <Grid container spacing={2}>
                        {addresses.map(a => (
                            <Grid item xs={12} md={6} lg={4} key={a.id}>
                                <Card sx={{ border: "1px solid #eee" }}>
                                    <CardContent>
                                        <Typography fontWeight={600}>{a.line1}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {a.city}, {a.state} {a.zip}
                                        </Typography>
                                        <Typography variant="body2">📞 {a.phone}</Typography>

                                        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                                            <Button size="small" variant="outlined" onClick={() => { setEdit(a); setOpenDialog(true); }}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" variant="outlined" onClick={() => removeAddress(a.id)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <AddressDialog
                        open={openDialog}
                        initial={edit}
                        onClose={() => setOpenDialog(false)}
                        onSave={upsertAddress}
                    />
                </Box>
            )}

            <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        </Box>
    );
}

