
import { IProductListProps } from '../../model/IProductListProps';
import Product from './Product';
import { Grid } from '@mui/material';

export default function ProductList({ products }:IProductListProps) {

  return (
    <Grid container spacing={2} marginTop={2}>
      {products.map((p) => (
        <Grid size={{ xs: 6, md: 4, lg: 2 }} key={p.id}>
          <Product key={p.id} product={p} />
        </Grid>
      ))}
    </Grid>)

}
