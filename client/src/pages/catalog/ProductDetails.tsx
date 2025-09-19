import { Grid, Typography,Divider, TableBody, TableContainer,Table ,TableRow,TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import MediaSkeleton from "../MediaSkeleton";
import { IMediaProps } from "../../model/IMediaProps";


export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<IMediaProps>({ loading: true });
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

    useEffect(() => {
        fetch(`${API_BASE_URL}/Products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error))
            .finally(() => setLoading({ loading: false }));
    }, [id]);
    if (loading.loading) {
        return <MediaSkeleton loading ={true} />;
    }

    if (!product) return <Typography variant="h3" color="primary">Product Not Found</Typography>;

    return (
        <Grid container spacing={2} marginTop={2} justifyContent={"center"} size={{ xs: 12, sm: 10, md: 8 }}>
            <Grid size={{lg:4 ,md:3, sm: 2, xs: 6}} textAlign={"center"}>
                <img src={`${API_IMAGES_URL}/${product.imageUrl}`} alt={product.name} style={{ width: '75%', height: 'auto'}} />
            </Grid >
            <Grid  size={{lg:8 ,md:9, sm: 10, xs: 12}} textAlign={"left"}>
                <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                    <Table>
                        <TableBody >
                            <TableRow>
                                <TableCell variant="head">Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">Stock</TableCell>
                                <TableCell>{product.stock}</TableCell>    
                            </TableRow>
                        </TableBody >
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}