import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductManager({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) {
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        onAddProduct(newProduct);
        setNewProduct({ name: '', price: '' });
    };

    const handleDeleteProduct = (id) => {
        onDeleteProduct(id);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = () => {
        onUpdateProduct(editingProduct);
        setEditingProduct(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">Product Manager</h2>
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                    Add Product
                </button>
            </div>
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                {products.map((product) => (
                    <div key={product.id} className="flex justify-between items-center border-b py-2">
                        <span className="text-black">{product.id || 'No ID'}</span>
                        <span className="text-black">{product.Name || 'No Name'}</span>
                        <span className="text-black">{product.Price || 'No Price'}</span>
                        <div>
                            <button
                                onClick={() => handleEditProduct(product)}
                                className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 text-white py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editingProduct && (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md mt-6">
                    <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={editingProduct.name}
                        onChange={handleEditInputChange}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Product Price"
                        value={editingProduct.price}
                        onChange={handleEditInputChange}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={handleUpdateProduct}
                            className="bg-blue-500 text-white py-2 px-4 rounded w-full mr-2"
                        >
                            Update Product
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white py-2 px-4 rounded w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
