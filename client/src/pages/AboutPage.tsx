import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { IProduct } from "../model/IProduct";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

const AboutPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/Products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Product fetch error:", err));
    }, []);

    return (
        <Box sx={{ backgroundColor: "#fff", overflow: "hidden" }}>
            {/* 🎬 HERO BANNER */}
            <Box sx={{ position: "relative", width: "100%", height: { xs: "55vh", md: "70vh" } }}>
                <Box
                    component="img"
                    src={products[4] ? `${API_IMAGES_URL}/${products[4].imageUrl}` : "/images/about_hero.jpg"}
                    alt="About Hero"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.6)",
                    }}
                />
                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(184,115,51,0.25), rgba(0,0,0,0.6))",
                    }}
                />
                {/* Text */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        color: "#fff",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            mb: 1,
                            fontFamily: "'Cormorant Garamond', serif",
                        }}
                    >
                        About DoA’s Cezve
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ maxWidth: 700, fontFamily: "'Lora', serif" }}
                    >
                        Handcrafted in Copper. Roasted in Austin. Inspired by Tradition.
                    </Typography>
                </Box>
            </Box>

            {/* 🌿 OUR STORY SECTION */}
            <Box
                sx={{
                    position: "relative",
                    py: { xs: 10, md: 14 },
                    textAlign: "center",
                    background:
                        "radial-gradient(circle at 50% 30%, rgba(184,115,51,0.05), transparent 70%)",
                }}
            >
                {/* Blur Copper Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom right, rgba(184,115,51,0.05), rgba(255,255,255,0.9))",
                        backdropFilter: "blur(10px)",
                        zIndex: 0,
                    }}
                />

                <Container
                    maxWidth="md"
                    sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: "#b87333",
                            fontFamily: "'Cormorant Garamond', serif",
                        }}
                    >
                        From a simple ritual to a craft.
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "#2d2d2d",
                            lineHeight: 2,
                            fontSize: "1.15rem",
                            fontFamily: "'Lora', serif",
                            textAlign: "center",
                            maxWidth: "850px",
                            mx: "auto",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {`It started in the middle of busy workdays not in a café, but in an office corner.

One cezve, a few curious colleagues, and a love for coffee that refused to stay ordinary. We brewed the first pot right there slow, quiet, aromatic. Before long, the whole floor smelled of roasted beans and shared stories.

Curiosity took over. We began experimenting with beans Sumatra, Ethiopia, and more comparing aromas, foam, and texture. Every brew taught us something new about balance, patience, and flavor. What began as a short break slowly turned into our favorite part of the day.

That’s where DoA’s Cezve was born from a simple office ritual to a craft we now share with the world.

Roasted in Austin, inspired by tradition, and brewed with the same spirit that once gathered friends around a cezve.

Today, we still keep that promise: every bag is roasted in small batches and ground to order, so your cup tastes as alive as the moment it’s brewed.

Because Turkish coffee deserves to be fresh and every cezve deserves a story.`}
                    </Typography>
                </Container>
            </Box>

            {/* 💎 CORE VALUES SECTION */}
            <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "#fafafa" }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            mb: 3,
                            color: "#b87333",
                            textAlign: "center",
                            fontFamily: "'Cormorant Garamond', serif",
                        }}
                    >
                        Doa’s Core Values
                    </Typography>

                    <Grid container spacing={4}>
                        {[
                            {
                                title: "We honor the art of Turkish coffee.",
                                text: "Every cup we craft carries a story a bridge between tradition and modern taste.",
                            },
                            {
                                title: "We make authenticity approachable.",
                                text: "From handmade copper cezves to our signature coffee blends, we bring the true essence of Turkish coffee to every table.",
                            },
                            {
                                title: "We are artisans at heart.",
                                text: "Precision, patience, and passion define every detail of what we create.",
                            },
                            {
                                title: "We value connection and respect.",
                                text: "Coffee is more than a drink it’s a shared moment, a bond between people and cultures.",
                            },
                            {
                                title: "We craft sustainably, think consciously.",
                                text: "From sourcing to packaging, we honor nature and the hands that make our coffee possible.",
                            },
                            {
                                title: "We believe in legacy.",
                                text: "We preserve a centuries old tradition while inspiring the next generation to carry it forward.",
                            },
                        ].map((value, i) => (
                            <Grid
                                key={i}
                                sx={{ xs: 12, sm: 6, md: 4 }}
                                component={motion.div}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#fff",
                                        p: 2,
                                        borderRadius: 3,
                                        height: "100%",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        border: "1px solid #f0f0f0",
                                        "&:hover": {
                                            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                                            transform: "translateY(-4px)",
                                            transition: "all 0.3s ease",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1,
                                            color: "#b87333",
                                            fontFamily: "'Cormorant Garamond', serif",
                                        }}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="#555"
                                        lineHeight={1.8}
                                        fontFamily="'Lora', serif"
                                    >
                                        {value.text}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default AboutPage;
