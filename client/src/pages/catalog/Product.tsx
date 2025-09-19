import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { IProduct } from '../../model/IProduct';
import { AddShoppingCart } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router';

export default function Product({ product }: { product: IProduct }) {
    return (

        <Card>
            <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5126/images/${product.imageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant='h6' component="h3" color='text-secondary' >
                    {product.name}
                </Typography>
                <Typography variant='body2' color='text.secondary' >
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant='body2' color={(product.stock ?? 0) > 0 ? 'green' : 'red'}>
                    {product.stock ?? 0 > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </Typography>
            </CardActions>
            <CardActions>
                <Button size='small' variant='outlined' disabled={(product.stock ?? 0) <= 0} startIcon={<AddShoppingCart />} color='success'>Add</Button>
                <Button component={Link} to ={`/catalog/${product.id}`} size='small' variant='outlined' disabled={(product.stock ?? 0) <= 0} startIcon={<SearchIcon />} color='primary'>View </Button>
            </CardActions>
        </Card >
    )

}

