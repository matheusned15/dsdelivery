import React, { useEffect, useState } from 'react';
import { fetchProducts, saveOrder } from '../api';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';
import OrderLocation from './OrderLocation';
import OrderSumary from './OrderSumary';
import ProductsList from './ProductsList';
import StepsHearder from './StepsHearder';
import { OrderLocationData, Product } from './types';
import { toast } from 'react-toastify'
import './styles.css';

function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    useEffect(() => {
        fetchProducts()
            .then(Response => setProducts(Response.data))
            .catch(error => {
                toast.warning('Erro ao listar produtos'); 
            })
    }, []);

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);

        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
            ...orderLocation!,
            products: productsIds
        }

        saveOrder(payload).then((Response) => {
            toast.error(`Pedido enviado com sucesso! Nº ${Response.data.id}`);
            setSelectedProducts([]);
        })
            .catch(() => {
                toast.warning('Erro ao enviar pedido');
            })
    }

    return (
        <>
            <div className="orders-container">
                <StepsHearder />
                <ProductsList
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                />
                <OrderLocation
                    onChangeLocation={location => setOrderLocation(location)} />
                <OrderSumary amount={selectedProducts.length}
                    totalPrice={totalPrice}
                    onSubmit={handleSubmit}
                />
            </div>
            <Footer />
        </>

    )
}

export default Orders;