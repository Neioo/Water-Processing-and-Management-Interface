// pages/sales.js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalesTable from '../components/SalesTable';


const Sales = () => {
  // DISPLAYING SALES
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchAllSales = async () => {
      try {
        const res = await axios.get("http://localhost:8800/sales");
        setSales(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSales();
  }, []);

  // ADDING SALES
  const [transaction, setTransaction] = useState({
    type: "",
    datetime: "",
    quantity: null,
    total: ""
  });

  const handleChange = (e) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/sales", transaction);
    } catch (err) {
      console.log("Error adding sales:", err); // Log error message
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/sales/" + id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SalesTable sales={sales} onDelete={handleDelete} />

      <div className="form max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Transaction</h1>
        <input
          type="text"
          placeholder="Type"
          onChange={handleChange}
          name="type"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="DateTime"
          onChange={handleChange}
          name="datetime"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
          name="quantity"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Total"
          onChange={handleChange}
          name="total"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>


    </>
  );
};

export default Sales;
