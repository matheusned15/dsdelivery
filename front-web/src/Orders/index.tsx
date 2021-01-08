import { error } from 'console';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductsList from './ProductsList';
import StepsHearder from './StepsHearder';
import './styles.css';
import { Product } from './types';

function Orders() {

    const [products, setProducts] = useState<Product[]>([]);

    console.log(products);
    useEffect(() => {
        fetchProducts()
            .then(Response => setProducts(Response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="orders-container">
            <StepsHearder />
            <ProductsList products={products} />
        </div>
    )
}

export default Orders;