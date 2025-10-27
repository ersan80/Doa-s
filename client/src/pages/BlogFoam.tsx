import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Divider,
    Grid,
    CardMedia,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { IProduct } from "../model/IProduct";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

const BlogFoam: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/Products`)
            .then((r) => r.json())
            .then(setProducts)
            .catch((e) => console.error("Product fetch error:", e));
    }, []);

    // Kahve görseli için uygun ürünü seç
    const coffeeProduct = useMemo(
        () =>
            products.find(
                (p) =>
                    p.name?.toLowerCase().includes("blend") ||
                    p.name?.toLowerCase().includes("coffee")
            ),
        [products]
    );

    const heroSrc =
        coffeeProduct?.imageUrl
            ? `${API_IMAGES_URL}/${coffeeProduct.imageUrl}`
            : "/images/blendx.png";

    return (
        <Box sx={{ backgroundColor: "#fff" }}>
            {/* HERO */}
            <Box sx={{ position: "relative", height: { xs: "45vh", md: "60vh" }, overflow: "hidden" }}>
                <CardMedia
                    component="img"
                    image={"/images/blendx.png"}
                    alt="Turkish Coffee"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.6)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#fff",
                        px: 2,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                    }}
                >
                    <Box component={motion.div} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                            The Secret to Perfect Turkish Coffee Foam
                        </Typography>
                        <Typography variant="subtitle1">October 03, 2025 · Cesur Ercan</Typography>
                    </Box>
                </Box>
            </Box>

            {/* CONTENT */}
            <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
                <Grid container spacing={4}>
                    <Grid sx={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, fontSize: "1.075rem", color: "#333" }}>
                            When it comes to Turkish coffee, one element instantly distinguishes a good cup from a
                            great one: the foam. A rich, velvety foam sitting on top of the tiny porcelain cup is not
                            just a mark of quality, but also a reflection of tradition and skill. For centuries, coffee
                            lovers have believed that the foam is a sign of both the brewer’s respect for the ritual and
                            the care taken in the preparation. But what really makes the perfect Turkish coffee foam,
                            and how can you achieve it at home?
                        </Typography>
                    </Grid>

                    {/* Why Foam Matters */}
                    <Grid sx={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#b87333", mb: 1 }}>
                            Why Foam Matters in Turkish Coffee
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333", mb: 1 }}>
                            In Turkish culture, the foam is more than just aesthetics — it’s a symbol of hospitality
                            and mastery. Serving a cup without foam is often considered impolite or careless. The foam
                            adds texture to the first sip, locking in the aroma of freshly ground coffee and creating a
                            luxurious experience.
                        </Typography>

                        <List dense sx={{ pl: 2 }}>
                            <ListItem disableGutters>
                                <ListItemText
                                    primaryTypographyProps={{ variant: "body1", sx: { color: "#333" } }}
                                    primary="Shows that the coffee was brewed slowly and gently."
                                />
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemText
                                    primaryTypographyProps={{ variant: "body1", sx: { color: "#333" } }}
                                    primary="Preserves the heat and aroma of the coffee."
                                />
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemText
                                    primaryTypographyProps={{ variant: "body1", sx: { color: "#333" } }}
                                    primary="Reflects the authenticity of the brewing technique."
                                />
                            </ListItem>
                        </List>
                    </Grid>

                    {/* Key Ingredients */}
                    <Grid sx={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#b87333", mb: 1 }}>
                            The Key Ingredients for Perfect Foam
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Freshly Ground Coffee
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            Foam is directly connected to the freshness of the beans. Pre-ground or stale coffee won’t
                            produce the same richness. Turkish coffee should be ground extremely fine, almost like
                            powder.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Cold, Fresh Water
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            Always start with cold water. Warm or hot water reduces the foam formation. The minerals in
                            fresh water also enhance both foam and flavor.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Copper Cezve (Coffee Pot)
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            A handmade copper cezve, like those crafted at Doa’s, ensures even heat distribution. This
                            allows the coffee to brew slowly without burning, which is crucial for stable foam.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Patience and Gentle Heat
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            Foam forms when the coffee is brought slowly to the edge of boiling. Rushing the process
                            with high heat will break the foam and ruin the texture.
                        </Typography>
                    </Grid>

                    {/* Steps */}
                    <Grid sx={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#b87333", mb: 1 }}>
                            Step-by-Step Guide to Achieve the Perfect Foam
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Measure and Mix
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            Add one heaped teaspoon of finely ground Turkish coffee per cup into the cezve. Add sugar
                            (if desired) and mix it with cold water before placing on heat.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Start Cold, Heat Slowly
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            Place the cezve on low heat. Stir only once at the beginning — after that, let the coffee
                            settle.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Watch the Foam Rise
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            As the coffee heats, foam will start to form. Just before it boils, remove the cezve from
                            the heat.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                            Divide the Foam
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                            Spoon some foam into each cup before pouring the rest of the coffee. This ensures every cup
                            looks perfect and has that signature foam crown.
                        </Typography>
                    </Grid>

                    {/* Mistakes */}
                    <Grid sx={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#b87333", mb: 1 }}>
                            Common Mistakes That Ruin Foam
                        </Typography>
                        <List dense sx={{ pl: 2 }}>
                            {[
                                "Using pre-ground, old coffee.",
                                "Boiling too quickly on high heat.",
                                "Stirring the coffee while it’s heating.",
                                "Using aluminum or thin pots instead of copper cezves.",
                            ].map((t) => (
                                <ListItem key={t} disableGutters>
                                    <ListItemText
                                        primaryTypographyProps={{ variant: "body1", sx: { color: "#333" } }}
                                        primary={t}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Ritual */}
                    <Grid sx={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#b87333", mb: 1 }}>
                            Foam as Part of the Ritual
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333", mb: 2 }}>
                            The beauty of Turkish coffee lies in its ritual. It’s not just about drinking, but about
                            sharing a moment. The foam on top of the cup represents respect for tradition and for the
                            person you’re serving. At Doa’s, we believe that brewing coffee with patience, using quality
                            beans and handcrafted cezves, is a way to keep this ritual alive.
                        </Typography>

                        <Box
                            sx={{
                                borderLeft: "4px solid #b87333",
                                backgroundColor: "#faf8f6",
                                p: 2,
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#2b2b2b", mb: 0.5 }}>
                                ✨ Final Thought
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.9, color: "#333" }}>
                                Perfect foam isn’t achieved by rushing — it’s the art of patience, quality, and respect
                                for tradition. With fresh beans, cold water, and a handcrafted copper cezve, anyone can
                                unlock the secret to a velvety, rich foam that makes Turkish coffee truly unforgettable.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 6 }} />
            </Container>
        </Box>
    );
};

export default BlogFoam;

