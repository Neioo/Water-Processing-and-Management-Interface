"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SalesTable from "../components/SalesTable";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [transaction, setTransaction] = useState({  //fields
    type: "",
    datetime: "",
    quantity: null,
    total: ""
  });

  // fetches the sales data 
  useEffect(() => { 
    const fetchAllSales = async () => {
      try {
        const res = await axios.get("http://localhost:8800/sales"); //look through the index.js file for reference
        setSales(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSales();
  }, []);

  const handleChange = (e) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/sales", transaction);
      const newSale = { ...transaction, id: response.data.id }; // Add ID to the new sale w/out this id wont be displayed in the table
      setSales((prevSales) => [...prevSales, newSale]); // Update sales state with the new sale
      setTransaction({ type: "", datetime: "", quantity: null, total: "" }); // Clear form
      console.log("Transaction added successfully");
    } catch (err) {
      console.log("Error adding transaction:", err);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/sales/${id}`);
      setSales((prevSales) => prevSales.filter((sale) => sale.id !== id)); // Update sales state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SalesTable sales={sales} onDelete={handleDelete} />
      {/* this will have to be a component in th future */}
      <div className="form max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
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
          type="datetime-local" // Use datetime-local input type for date and time
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

