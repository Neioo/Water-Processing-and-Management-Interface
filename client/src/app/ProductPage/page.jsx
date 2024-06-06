"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductManager from '../components/ProductManager'

export default function ProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8800/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:8800/products', newProduct);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            await axios.put(`http://localhost:8800/products/${updatedProduct.id}`, updatedProduct);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <ProductManager
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
            />
        </div>
    );
}