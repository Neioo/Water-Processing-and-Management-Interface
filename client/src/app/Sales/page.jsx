"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SalesTable from "../components/SalesTable";
import AddSalesForm from "../components/AddSalesForm";
import UpdateForm from "../components/UpdateForm";
import Dashboard from "../components/Dashboard";
import SalesChart from "../components/SalesChart";
import { OrdersByDayChart } from "../charts/OrdersByDay";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [transaction, setTransaction] = useState({  //fields
    type: "",
    datetime: "",
    quantity: null,
    total: "",
    updatetime: ""
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

  const handleUpdateClick = (sale) => {
    setSelectedSale(sale);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = (updatedSale) => {
    setSales((prevSales) =>
      prevSales.map((sale) => (sale.id === updatedSale.id ? updatedSale : sale))
    );
  };

  return (
    <>
      <SalesTable sales={sales} onDelete={handleDelete} onUpdateClick={handleUpdateClick} />
      <div className="flex justify-center my-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add New Transaction
        </button>
      </div>
      <AddSalesForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={transaction}
        handleChange={handleChange}
        handleClick={handleClick}
      />

      <UpdateForm
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        sale={selectedSale}
        onUpdate={handleUpdate}
      />

      <SalesChart sales={ sales } />

    </>
  );
};

export default Sales;

