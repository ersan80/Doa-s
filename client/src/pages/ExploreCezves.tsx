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
                src="/images/classic_mix_copper.jpg"
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
                   🏺 The Value of Handcrafted Copper Cezves
                </Typography>

                <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
                    Every handcrafted copper cezve tells a story one of patience, fire,
                    and the art of transformation. At Doa’s, we believe a cezve isn’t just
                    a brewing tool; it’s a piece of living heritage forged by skilled
                    hands and generations of mastery.
                    <br />
                    <br />
                    When copper meets flame, something extraordinary happens. The metal
                    softens, bends, and comes alive shaped by artisans who’ve learned
                    not from machines, but from rhythm, touch, and tradition. Every hammer
                    mark is intentional, every curve precise. These aren’t imperfections
                    they’re signatures of authenticity.
                    <br />
                    <br />
                    Owning one isn’t just owning a coffee pot it’s embracing centuries
                    of craftsmanship that turned simple coffee into a ritual of
                    connection. It’s a reminder that great things are made slowly,
                    thoughtfully, and with soul.
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
                  🏺 Shop Handcrafted Cezves
                </Button>
            </Stack>

        </Box>
    );
}
