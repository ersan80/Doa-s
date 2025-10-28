import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
const videos = [
    "/videos/handcrafted.mp4",
    "/videos/hammering.mp4",
    "/videos/copper_finish.mp4",
];

const HeroSection: React.FC = () => {
    const [currentVideo, setCurrentVideo] = useState(0);

    // 5 saniyede bir video değiştir
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                margin: 0,
                padding: 0,
            }}
        >
            {/* 🎥 Video Slider */}
            <AnimatePresence>
                <motion.video
                    key={currentVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                    }}
                >
                    <source src={videos[currentVideo]} type="video/mp4" />
                </motion.video>
            </AnimatePresence>

            {/* 💬 Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#fff",
                    zIndex: 1,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
                    px: 2,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        fontSize: { xs: "2rem", md: "3.5rem" },
                    }}
                >
                    Handcrafted Copper Cezves
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        maxWidth: "600px",
                        mb: 3,
                        fontSize: { xs: "1rem", md: "1.2rem" },
                    }}
                >
                    Each cezve is forged by hand — a timeless ritual blending heritage and
                    artistry.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                        backgroundColor: "#b87333",
                        "&:hover": { backgroundColor: "#a0622d" },
                    }}
                    component={NavLink}
                    to="/shop"
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;


