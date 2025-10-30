import { Box, Typography, Button, Stack } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router";

export default function AboutCraftSection() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);


    return (
        <Box
            ref={ref}
            component={motion.div}
            initial="hidden"
            animate={controls}

            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 6, md: 12 },
                py: { xs: 6, sm: 10 },
                gap: { xs: 4, md: 8 },
                backgroundColor: "#fff",
            }}
        >
            {/* Sol: Görsel */}
            <Box
                component={motion.img}
                src="/images/doas_coffee_natural.jpg"
                alt="Handcrafted Copper Cezves"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                sx={{
                    width: { xs: "100%", md: "45%" },
                    borderRadius: 3,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    objectFit: "cover",
                }}
            />

            <Stack
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                sx={{
                    width: { xs: "100%", md: "50%" },
                    textAlign: { xs: "center", md: "left" },
                    fontFamily: "Inter, sans-serif",
                }}
                spacing={2}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#2a2a2a", mb: 1 }}
                >
                    ☕ Discover Our Coffee
                </Typography>

                <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
                    Each cup of coffee tells a story — ours begins with carefully sourced beans and a deep respect for the Turkish brewing ritual.
                    At Doa’s Cezve, we reimagine Turkish coffee for today: pure, aromatic, and alive.
                    Our signature blends combine the sweetness of Brazilian beans, the depth of Indian Arabica, and the delicate fruit notes of Ethiopian origins — roasted in Austin, perfected by craft.
                    <br />
                    <br />
                    Every batch is roasted in small quantities to preserve the natural oils, aroma, and body that define authentic Turkish coffee.
                    Ground fresh to order, each sip carries the harmony of centuries-old tradition and modern precision.
                    <br />
                    <br />
                    Whether you crave a cup rich and chocolatey or bright and aromatic, our coffee is made to honor the foam, aroma, and soul of Turkish coffee — as it was meant to be.
                </Typography>

                <Button
                    variant="contained"
                    component={NavLink}
                    to="/shop"
                    sx={{
                        alignSelf: { xs: "center", md: "flex-start" },
                        mt: 2,
                        px: 4,
                        py: 1.4,
                        backgroundColor: "#b87333",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "1rem",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#a46328" },
                    }}
                >
                    ☕ Discover Our Coffee
                </Button>
            </Stack>

        </Box>
    );
}
