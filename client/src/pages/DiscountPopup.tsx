import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
    Stack,
    Divider,
    Fade,
    Backdrop,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const brandBrown = "#b87333";

export default function DiscountPopup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("welcome_popup_shown");
        if (!hasSeenPopup) {
            setTimeout(() => setOpen(true), 1000); // 1 sn sonra aç
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("welcome_popup_shown", "true");
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: "blur(6px)", // 👈 soft blur efekti
                    backgroundColor: "rgba(0,0,0,0.25)",
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "#fff",
                        borderRadius: 4,
                        boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
                        width: { xs: "85%", sm: 420 },
                        p: { xs: 3, sm: 4 },
                        textAlign: "center",
                        fontFamily: "Inter, sans-serif",
                        animation: "fadeIn 0.6s ease",
                        "@keyframes fadeIn": {
                            from: { opacity: 0, transform: "translate(-50%, -45%)" },
                            to: { opacity: 1, transform: "translate(-50%, -50%)" },
                        },
                    }}
                >
                    <Stack alignItems="center" spacing={2}>
                        <LocalOfferIcon
                            sx={{
                                fontSize: 50,
                                color: brandBrown,
                                mb: 1,
                                animation: "pulse 1.8s infinite ease-in-out",
                                "@keyframes pulse": {
                                    "0%, 100%": { transform: "scale(1)" },
                                    "50%": { transform: "scale(1.08)" },
                                },
                            }}
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.4rem",
                                color: "#2a2a2a",
                            }}
                        >
                            Welcome to Doa’s Cezve ☕
                        </Typography>

                        <Typography
                            sx={{
                                color: "#555",
                                fontSize: "0.95rem",
                                lineHeight: 1.6,
                                mt: 0.5,
                            }}
                        >
                            Use code{" "}
                            <Box
                                component="span"
                                sx={{
                                    backgroundColor: "rgba(184,115,51,0.1)",
                                    color: brandBrown,
                                    px: 1,
                                    py: 0.3,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                }}
                            >
                                WELCOME20
                            </Box>{" "}
                            at checkout and enjoy <strong>20% off</strong> your first order.
                        </Typography>

                        <Divider sx={{ my: 2, width: "60%" }} />

                        <Button
                            variant="contained"
                            onClick={handleClose}
                            href="/shop"
                            sx={{
                                bgcolor: brandBrown,
                                "&:hover": { bgcolor: "#a46328" },
                                borderRadius: 2,
                                px: 4,
                                py: 1.2,
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "1rem",
                            }}
                        >
                            Shop Now
                        </Button>

                        <Button
                            onClick={handleClose}
                            sx={{
                                color: "#777",
                                textTransform: "none",
                                fontSize: "0.85rem",
                                "&:hover": { color: brandBrown },
                            }}
                        >
                            Maybe Later
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
