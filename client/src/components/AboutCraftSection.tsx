import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { IProduct } from "../model/IProduct";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

const AboutCraftSection: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/Products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Product fetch error:", err));
    }, []);
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                px: { xs: 2, md: 8 },
                backgroundColor: "#fff",
            }}
        >
            <Grid
                container
                spacing={6}
                alignItems="center"
                direction={{ xs: "column", md: "row" }}
            >
                {/* 🏺 Sol taraf - Görsel */}
                <Grid size={{ xs: 12, md: 6 }} >
                    <Box
                        component={motion.img}
                        src={`${API_IMAGES_URL}/${products[2]?.imageUrl}`}
                        alt={products[3]?.name || "Handcrafted Copper Cezve"}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        sx={{
                            width: "100%",
                            borderRadius: 3,
                            objectFit: "cover",
                            boxShadow: 3,
                        }}
                    />
                </Grid>

                {/* ✍️ Sağ taraf - Metin */}
                <Grid size={{ xs: 12, md: 6 }} >
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#333",
                            }}
                        >
                            Handcrafted Copper Cezves
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#555",
                                lineHeight: 1.8,
                                mb: 3,
                            }}
                        >
                            Each cezve we craft is forged by hand — shaped, hammered, and
                            finished with deep respect for the centuries-old Turkish coffee
                            tradition. Our artisans continue a legacy passed through
                            generations, using pure copper and tin for perfect heat balance
                            and rich, foamy brews.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#b87333",
                                "&:hover": { backgroundColor: "#a0622d" },
                            }}
                        >
                            Explore Cezves
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* ☕️ 2. Bölüm — Kahveler */}
            <Grid
                container
                spacing={6}
                alignItems="center"
                direction={{ xs: "column-reverse", md: "row" }}
                sx={{ mt: { xs: 10, md: 16 } }}
            >
                {/* Metin */}
                <Grid size={{ xs: 12, md: 6 }} >
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#333",
                            }}
                        >
                            Turkish Coffee — Reimagined
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#555",
                                lineHeight: 1.8,
                                mb: 3,
                            }}
                        >
                            {products[3]?.description}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#b87333",
                                "&:hover": { backgroundColor: "#a0622d" },
                            }}
                        >
                            Discover Our Coffee
                        </Button>
                    </Box>
                </Grid>

                {/* Görsel */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        component={motion.img}
                        src={`${API_IMAGES_URL}/${products[3]?.imageUrl}`}
                        alt={products[3]?.name || "Turkish Coffee"}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        sx={{
                            width: "100%",
                            borderRadius: 3,
                            objectFit: "cover",
                            boxShadow: 3,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutCraftSection;
