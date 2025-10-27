import React, { useState } from "react";
import { Box, Container, Grid, Typography, Pagination, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

const blogs = [
    {
        id: 1,
        title: "The Secret to Perfect Turkish Coffee Foam",
        date: "October 03, 2025",
        author: "Cesur Ercan",
        image: "/images/blendx.png",
        excerpt: "Learn how to master the art of Turkish coffee foam — the symbol of patience and tradition.",
        link: "/blog/foam",
    },
    {
        id: 2,
        title: "The Art of Handcrafted Copper Cezves",
        date: "October 27, 2025",
        author: "Doa’s Cezve Team",
        image: "/images/classic_mix_copper.jpg",
        excerpt: "Explore the timeless craft of handmade copper cezves and their role in modern coffee culture.",
        link: "/blog/copper",
    },
];

const BlogList = () => {
    const [page, setPage] = useState(1);
    const postsPerPage = 1;
    const totalPages = Math.ceil(blogs.length / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const displayedBlogs = blogs.slice(startIndex, startIndex + postsPerPage);

    return (
        <Container maxWidth="md" sx={{ py: 6 }} >
            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4}>
                Doa’s Journal
            </Typography>

            <Grid container spacing={4} justifyContent={"center"}>
                {displayedBlogs.map((b) => (
                    <Grid sx={{xs:12}} key={b.id} >
                        <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
                            <CardMedia component="img" height="400" image={b.image} alt={b.title} sx={{ objectFit: "cover" }} />
                            <CardContent>
                                <Typography variant="h5" fontWeight={600} gutterBottom>{b.title}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">{b.date} · {b.author}</Typography>
                                <Typography variant="body1" mt={2} mb={3}>{b.excerpt}</Typography>
                                <Button variant="contained" component={Link} to={b.link} sx={{ backgroundColor: "#b87333" }}>
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    sx={{
                        "& .MuiPaginationItem-root": { color: "#333" },
                        "& .Mui-selected": { backgroundColor: "#b87333", color: "#fff" },
                    }}
                />
            </Box>
        </Container>
    );
};

export default BlogList;

