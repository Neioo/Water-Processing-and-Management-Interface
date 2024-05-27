import React from 'react'

const AddSalesForm = ({ isOpen, onClose, transaction, handleChange, handleClick}) => {
    if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Transaction</h1>
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
          placeholder="DateTime"
          value={transaction.datetime}
          onChange={handleChange}
          name="datetime"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={transaction.quantity || ""}
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
            Add.
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSalesForm