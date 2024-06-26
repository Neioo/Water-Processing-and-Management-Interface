"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SalesTable from "../components/SalesTable";
import AddSalesForm from "../components/AddSalesForm";
import UpdateForm from "../components/UpdateForm";
import NewSalesTable from "@/app/components/NewSalesTable";
import { toast } from 'sonner';
import ToastNotifications from '../components/Toast'
import CSVExport from "../components/CSVExport";
import NavBar from "@/app/components/Navbar";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [transaction, setTransaction] = useState({
    type: "",
    datetime: "",
    quantity: null,
    total: "",
    updatetime: "",
  });

  // fetches the sales data
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

  // fetches the product data
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleChange = (e) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/sales",
        transaction
      );
      const newSale = { ...transaction, id: response.data.id };
      setSales((prevSales) => [...prevSales, newSale]);
      setTransaction({
        type: "",
        datetime: "",
        quantity: null,
        total: "",
      });
      toast('Transaction added successfully');
      toast.success('Transaction added successfully');
    } catch (err) {
      console.log("Error adding transaction:", err);
      toast.error('Error adding transaction');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/sales/${id}`);
      setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
      toast.success('Transaction deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting transaction');
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
      <NavBar style={{ width: "100% " }} />
      <div style={{ width: "80% ", margin: "auto" }}>
        <div className="flex justify-end gap-4">
          <CSVExport />
          <ToastNotifications />
          <div className="mt-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              Add New Transaction
            </button>
          </div>
        </div>
        <SalesTable
          sales={sales}
          onDelete={handleDelete}
          onUpdateClick={handleUpdateClick}
        />

        <AddSalesForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={transaction}
          handleChange={handleChange}
          handleClick={handleClick}
          products={products} // Pass products data as a prop
        />

        <UpdateForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          sale={selectedSale}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default Sales;