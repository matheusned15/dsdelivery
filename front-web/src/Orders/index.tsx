import { error } from 'console';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import OrderLocation from './OrderLocation';
import ProductsList from './ProductsList';
import StepsHearder from './StepsHearder';
import './styles.css';
import { OrderLocationdata, Product } from './types';

function Orders() {

    const [products, setProducts] = useState<Product[]>([]);

    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();


    useEffect(() => {
        fetchProducts()
            .then(Response => setProducts(Response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="orders-container">
            <StepsHearder />
            <ProductsList products={products} />
            <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
        </div>
    )
}

export default Orders;