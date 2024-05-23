// UpdateForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = ({ sale }) => {
  const [transaction, setTransaction] = useState({
    type: sale.type,
    datetime: sale.datetime,
    quantity: sale.quantity,
    total: sale.total
  });

  const handleChange = (e) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/sales/${sale.id}`, transaction);
      console.log('Transaction updated successfully');
    } catch (err) {
      console.log('Error updating transaction:', err);
    }
  };

  return (
    <div className="form max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Transaction</h1>
      <input
        type="text"
        placeholder="Type"
        value={transaction.type}
        onChange={handleChange}
        name="type"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="DateTime"
        value={transaction.datetime}
        onChange={handleChange}
        name="datetime"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={transaction.quantity}
        onChange={handleChange}
        name="quantity"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Total"
        value={transaction.total}
        onChange={handleChange}
        name="total"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleClick}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateForm;
