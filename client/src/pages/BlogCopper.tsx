import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

const BlogCopper: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            {/* 🏺 Header Görsel */}
            <Box
                component={motion.img}
                src="/images/classic_mix_copper.jpg"
                alt="Handcrafted Copper Cezve"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                sx={{
                    width: "100%",
                    height: { xs: 280, md: 400 },
                    objectFit: "cover",
                    borderRadius: 3,
                    boxShadow: 3,
                    mb: 4,
                }}
            />

            {/* Başlık ve meta */}
            <Typography
                variant="h3"
                textAlign="center"
                fontWeight={700}
                gutterBottom
                sx={{ color: "#2d2d2d" }}
            >
                The Art of Handcrafted Copper Cezves
            </Typography>
            <Typography
                variant="subtitle2"
                textAlign="center"
                color="text.secondary"
                gutterBottom
            >
                October 27, 2025 · Doa’s Cezve Team
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* 🧿 Blog İçeriği */}
            <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    For centuries, the <strong>handcrafted copper cezve</strong> also known as
                    the <em>Turkish coffee pot</em> has been at the heart of coffee rituals
                    across Anatolia and beyond. Each cezve tells a story: of heat, metal,
                    patience, and mastery. In an age of machines and mass production, these
                    small copper pots continue to symbolize something deeply human the art
                    of making coffee with care.
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#b87333", mb: 2 }}>
                    🔨 The Legacy of Copper Craftsmanship
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Long before the first espresso machine was built, artisans in Istanbul,
                    Gaziantep, and Trabzon were hammering pure copper sheets into elegant,
                    functional cezves. Every strike of the hammer shaped not just metal, but
                    memory a rhythm passed from master to apprentice.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    A handmade copper cezve isn’t just a tool. It’s a companion in the ritual of
                    Turkish coffee: the perfect conductor of heat, ensuring that each cup
                    develops a thick, aromatic foam without scorching the grounds. At{" "}
                    <strong>Doa’s Cezve</strong>, we continue this legacy by working with master
                    craftsmen who still forge every cezve by hand.
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#b87333", mb: 2 }}>
                    ⚖️ Why Copper Matters
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Copper is one of nature’s most efficient heat conductors. When you brew
                    Turkish coffee, even heat distribution is critical too much heat burns
                    the foam, too little leaves the coffee flat.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    That’s why a handcrafted copper cezve remains irreplaceable. It reacts
                    instantly to temperature changes, allowing precise control over the brewing
                    process.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Each of our cezves is lined with pure tin, a traditional method that ensures
                    safety and prevents the metallic taste of untreated copper. The result is a
                    timeless balance of <em>art, science, and ritual.</em>
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#b87333", mb: 2 }}>
                    ✋ Every Detail Tells a Story
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Every cezve at <strong>Doa’s</strong> is a testament to individuality:
                </Typography>
                <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem", lineHeight: 1.8 }}>
                    <li>The subtle hammer marks on each surface.</li>
                    <li>The carefully curved spout for perfect pour control.</li>
                    <li>The brass handle — shaped to stay cool yet elegant.</li>
                </ul>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    No two cezves are identical, because no two hands shape them the same. That
                    uniqueness is what makes them special {" "}
                    <strong>a symbol of authenticity and craftsmanship.</strong>
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#b87333", mb: 2 }}>
                    🌍 Tradition Meets Modern Coffee Culture
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    As Turkish coffee gains global appreciation, the cezve becomes more than an
                    artifact; it becomes an ambassador of culture. From Austin to Istanbul,
                    coffee enthusiasts rediscover the beauty of brewing slowly — not for
                    convenience, but for connection.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    At <strong>Doa’s Cezve</strong>, we merge heritage and innovation: authentic
                    handmade pots paired with freshly roasted beans, creating a bridge between
                    past and present.
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#b87333", mb: 2 }}>
                    💬 Final Thought
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    In a world chasing speed, the handcrafted copper cezve reminds us to slow
                    down, listen to the rhythm of the boil, and savor the story behind every
                    cup. Because true craftsmanship isn’t just seen it’s felt.
                </Typography>
            </Box>
        </Container>
    );
};

export default BlogCopper;
