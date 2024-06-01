import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = ({ isOpen, onClose, sale, onUpdate }) => {
  const [transaction, setTransaction] = useState({
    type: '',
    datetime: '',
    quantity: 0,
    total: '',
    updatetime: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sale) {
      setTransaction({
        type: sale.type || '',
        datetime: sale.datetime || '',
        quantity: sale.quantity || 0,
        total: sale.total || '',
        updatetime: sale.updatetime || ''
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Convert updatetime to the appropriate format (YYYY-MM-DD HH:MM:SS)
      const formattedUpdatetime = new Date(transaction.updatetime).toISOString().slice(0, 19).replace('T', ' ');
      const updatedTransaction = { ...transaction, updatetime: formattedUpdatetime };
  
      await axios.put(`http://localhost:8800/sales/${sale.id}`, updatedTransaction);
      onUpdate({ ...updatedTransaction, id: sale.id });
      onClose();
      console.log('Transaction updated successfully');
    } catch (err) {
      setError('Error updating transaction');
      console.error('Error details:', err);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="form max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Transaction</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Type"
          value={transaction.type}
          onChange={handleChange}
          name="type"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="datetime-local"
          placeholder="Update Time"
          value={transaction.updatetime}
          onChange={handleChange}
          name="updatetime"
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
