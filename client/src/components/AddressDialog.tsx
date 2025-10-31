import { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Grid, Button
} from "@mui/material";
import { Address } from "../model/UserTypes";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (addr: Omit<Address, "id"> | Address) => Promise<void> | void;
    initial?: Address | null;
};

export default function AddressDialog({ open, onClose, onSave, initial }: Props) {
    const [form, setForm] = useState<Omit<Address, "id">>({
        line1: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        apartment: "",
    });

    useEffect(() => {
        if (initial) {
            const { id, ...rest } = initial;
            setForm(rest);
        } else {
            setForm({ line1: "", city: "", state: "", zip: "", phone: "", apartment: "" });
        }
    }, [initial, open]);

    const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(s => ({ ...s, [k]: e.target.value }));

    const handleSave = async () => {
        await onSave(initial ? { id: initial.id, ...form } : form);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initial ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item xs={12}>
                        <TextField label="Address" fullWidth value={form.line1} onChange={handleChange("line1")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField label="City" fullWidth value={form.city} onChange={handleChange("city")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Apartment / Suite / Floor (optional)"
                            fullWidth
                            value={form.apartment || ""}
                            onChange={handleChange("apartment")}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField label="State" fullWidth value={form.state} onChange={handleChange("state")} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField label="ZIP Code" fullWidth value={form.zip} onChange={handleChange("zip")} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField label="Phone" fullWidth value={form.phone} onChange={handleChange("phone")} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{ bgcolor: "#6b4a2b", "&:hover": { bgcolor: "#553a21" } }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
