import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom"; // ✅ düzeltildi
import { useCart } from "../../context/CartContext"; // ✅ sepet context'i eklendi

const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function Product({ product }: { product: IProduct }) {
    const { addToCart } = useCart(); // ✅ cart context'ten addToCart alıyoruz

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
        });
    };

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                borderRadius: 3,
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardMedia
                sx={{
                    height: 180,
                    backgroundSize: "cover",
                    backgroundColor: "#fafafa",
                    borderBottom: "1px solid #eee",
                    "& img": {
                        borderRadius: "12px",
                    },
                }}
                image={`${API_IMAGES_URL}/${product.imageUrl}`}
                title={product.name}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: "#333",
                        textAlign: "center",
                        fontSize: "1rem",
                        minHeight: 56,
                    }}
                >
                    {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                    ${product.price}
                </Typography>

                <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{
                        mt: 1,
                        color: (product.stock ?? 0) > 0 ? "green" : "red",
                        fontWeight: 500,
                    }}
                >
                    {product.stock && product.stock > 0
                        ? `In Stock: ${product.stock}`
                        : "Out of Stock"}
                </Typography>
            </CardContent>

            <Box sx={{ p: 1 }}>
                <CardActions sx={{ justifyContent: "center", gap: 1 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<AddShoppingCart />}
                        color="success"
                        disabled={(product.stock ?? 0) <= 0}
                        onClick={handleAddToCart} // ✅ çalıştırıyoruz
                    >
                        ADD
                    </Button>

                    <Button
                        component={Link}
                        to={`/catalog/${product.id}`}
                        size="small"
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        color="primary"
                        disabled={(product.stock ?? 0) <= 0}
                    >
                        VIEW
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}
