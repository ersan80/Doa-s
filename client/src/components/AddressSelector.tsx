
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Radio, Button, Stack } from "@mui/material";
import { Address, User } from "../model/UserTypes";
import { fetchJson } from "../utils/fetchJson";
import AddressDialog from "./AddressDialog";
import { toast } from "react-toastify";

type Props = {
    onSelected?: (addr: Address | null) => void;
};

export default function AddressSelector({ onSelected }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState<Address | null>(null);

    const load = async () => {
        try {
            const u = await fetchJson<User>(`${import.meta.env.VITE_API_BASE_URL}/user`);
            setUser(u);
            setAddresses(u.addresses || []);
            // persisted seçim
            const persisted = localStorage.getItem("selectedAddressId");
            if (persisted) setSelectedId(Number(persisted));
        } catch {
            toast.error("Could not load addresses.");
        }
    };

    useEffect(() => { load(); }, []);

    useEffect(() => {
        const sel = addresses.find(a => a.id === selectedId) || null;
        onSelected?.(sel);
        if (sel) {
            // apartment alanı eksik veya undefined olmasın diye normalize ediyoruz
            const normalized = { ...sel, apartment: sel.apartment || "" };
            localStorage.setItem("selectedAddressId", String(normalized.id));
            localStorage.setItem("selectedAddress", JSON.stringify(normalized));
        }
    }, [selectedId, addresses]);


    const upsert = async (data: Omit<Address, "id"> | Address) => {
        if (!user) return;
        if ("id" in data) {
            // UPDATE
            const updated = await fetchJson<Address>(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address/${data.id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            setAddresses(prev => prev.map(a => (a.id === updated.id ? updated : a)));
            toast.success("Address updated");
        } else {
            // CREATE
            const created = await fetchJson<Address>(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            await load(); // 👈 yenile
            setSelectedId(created.id);
            toast.success("Address added");

        }
    };

    const remove = async (id: number) => {
        if (!user) return;
        await fetchJson(`${import.meta.env.VITE_API_BASE_URL}/user/${user.id}/address/${id}`, { method: "DELETE" });
        setAddresses(prev => prev.filter(a => a.id !== id));
        if (selectedId === id) setSelectedId(null);
        toast.success("Address deleted");
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, bgcolor: "#fff" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#6b4a2b" }}>
                    Select Delivery Address
                </Typography>
                <Button variant="contained" onClick={() => { setEdit(null); setOpenDialog(true); }}
                    sx={{ bgcolor: "#6b4a2b", "&:hover": { bgcolor: "#553a21" } }}>
                    Add New Address
                </Button>
            </Stack>

            <Grid container spacing={2}>
                {addresses.map(a => (
                    <Grid sx={{xs:12, md:6, lg:4}} key={a.id}>
                        <Card
                            onClick={() => setSelectedId(a.id)}
                            sx={{
                                cursor: "pointer",
                                border: selectedId === a.id ? "2px solid #b38b59" : "1px solid #eee",
                                boxShadow: selectedId === a.id ? 4 : 1,
                                transition: "all .2s",
                                "&:hover": { boxShadow: 3 },
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                    <Radio checked={selectedId === a.id} onChange={() => setSelectedId(a.id)} />
                                    <Box>
                                        <Typography fontWeight={600}>{a.line1}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {a.city}, {a.state} {a.zip}
                                        </Typography>
                                        <Typography variant="body2">📞 {a.phone}</Typography>

                                        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                                            <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); setEdit(a); setOpenDialog(true); }}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" variant="outlined" onClick={(e) => { e.stopPropagation(); remove(a.id); }}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </Box>
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
                onSave={upsert}
            />
        </Box>
    );
}
