import { useEffect, useState } from 'react';
import { IProduct } from '../../model/IProduct';    
import ProductList from './ProductList';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function CatalogPage() {

    const [products, setProducts] = useState<IProduct[]>([]);
    

    useEffect(() => {

        fetch(`${API_BASE_URL}/Products`).then(res => res.json()).then(data => {
            console.log(data);
            setProducts(data)
        })
            ;
    }, []);



    return (
        <ProductList products={products} />
    )
}