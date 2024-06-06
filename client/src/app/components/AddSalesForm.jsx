import React from 'react';

const AddSalesForm = ({ isOpen, onClose, transaction, products, handleChange, handleClick }) => {
    if (!isOpen) return null;

    // Function to handle change in input fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      // Reset quantity and total whenever the product type changes
      if (name === 'type') {
          handleChange({ target: { name: 'quantity', value: '' } });
          handleChange({ target: { name: 'total', value: '' } });
      }
  
      // If the name input changes, find the corresponding product and update its price
      if (name === 'type') {
          const selectedProduct = products.find(product => product.name === value);
          handleChange({ target: { name: 'price', value: selectedProduct ? selectedProduct.price.toString() : '' } });
      }
      // If the quantity input changes, calculate the total
      if (name === 'quantity') {
          const total = parseFloat(transaction.price || 0) * parseInt(value || 0);
          handleChange({ target: { name: 'total', value: total.toString() } });
      }
      // Update the transaction state with the input value
      handleChange(e);
  };
  

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Add New Transaction</h1>
                <select
                    value={transaction.type}
                    onChange={handleInputChange}
                    name="type"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.name}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    placeholder="DateTime"
                    value={transaction.datetime}
                    onChange={handleInputChange}
                    name="datetime"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={transaction.quantity || ''}
                    onChange={handleInputChange}
                    name="quantity"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Total"
                    value={transaction.total}
                    onChange={handleInputChange}
                    name="total"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled // Disable the total input field
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSalesForm;

