import { Box, Grid, Typography, TextField, Button, IconButton, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#fafafa",
                color: "#333",
                py: { xs: 6, md: 10 },
                px: { xs: 3, md: 8 },
                borderTop: "1px solid #e0e0e0",
                textAlign: { xs: "center", md: "left" },
            }}
        >
            <Grid container spacing={4} justifyContent="space-between">
                {/* 📰 Email Membership */}
                <Grid sx={{ xs: 12, md: 6 }} >
                    <Typography
                        variant="subtitle2"
                        sx={{ letterSpacing: 2, mb: 1, fontWeight: 600 }}
                    >
                        EXCLUSIVE BENEFITS
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                    >
                        <TextField
                            placeholder="Enter email here"
                            variant="standard"
                            sx={{
                                width: "70%",
                                "& .MuiInputBase-root": { color: "#333" },
                            }}
                        />
                        <IconButton
                            sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                borderRadius: "50%",
                                "&:hover": { backgroundColor: "#333" },
                            }}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Stack>

                    <Typography
                        variant="body2"
                        sx={{ color: "#777", mt: 1, maxWidth: 400 }}
                    >
                        Apply for our free membership to receive exclusive deals, news, and
                        events. We promise not to spam your inbox.
                    </Typography>
                </Grid>

                {/* 🌐 Social Links */}
                <Grid sx={{ xs: 12, md: 4 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ letterSpacing: 2, mb: 1, fontWeight: 600 }}
                    >
                        FOLLOW DOA’S CEZVE ON SOCIAL MEDIA
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                    >
                        <IconButton href="https://instagram.com" target="_blank">
                            <InstagramIcon sx={{ color: "#000" }} />
                        </IconButton>
                        <IconButton href="https://youtube.com" target="_blank">
                            <YouTubeIcon sx={{ color: "#000" }} />
                        </IconButton>
                    </Stack>

                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#6c47ff",
                                borderRadius: "30px",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                "&:hover": { backgroundColor: "#5632cc" },
                            }}
                        >
                            💜 Follow on Shop
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* 🧾 Alt Bilgi */}
            <Box
                sx={{
                    borderTop: "1px solid #e0e0e0",
                    mt: 8,
                    pt: 3,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    fontSize: "0.875rem",
                    color: "#777",
                }}
            >
                <Typography>© 2025, doa’s cezve. All rights reserved.</Typography>
                <Typography>
                    Powered by <strong>Doa's Cezve </strong> · <strong>Privacy Policy</strong>
                </Typography>

                {/* 💳 Kart ikonları */}
                <Stack direction="row" spacing={1}>
                    <img src="/icons/visa-icon.svg" alt="Visa" width={36} />
                    <img src="/icons/mastercard.svg" alt="Mastercard" width={36} />
                    <img src="/icons/paypal.svg" alt="PayPal" width={36} />
                    <img src="/icons/applepay.svg" alt="Apple Pay" width={36} />
                    <img src="/icons/googlepay.svg" alt="Google Pay" width={36} />
                </Stack>
            </Box>
        </Box>
    );
}
