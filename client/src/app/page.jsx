"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import NewSalesTable from "@/app/components/NewSalesTable";

export default function Home() {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/sales");
        setSalesData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Calculate total sales, average profit, and profit for the day
  let totalSales = 0;
  let totalProfit = 0;
  let totalOrders = 0;
  const today = new Date().toLocaleDateString();
  let profitForTheDay = 0;

  salesData.forEach((sale) => {
    totalSales += sale.total;
    totalProfit += sale.total - sale.cost;
    totalOrders++;
    if (new Date(sale.datetime).toLocaleDateString() === today) {
      profitForTheDay += sale.total;
    }
  });

  const averageProfit = totalSales / totalOrders;

  const latestSales = salesData.slice(0, 10);

  return (
    <div>
      <p className="text-3xl text-bold text-center pt-5 pb-4">Welcome back, Admin</p>
      <div className="grid grid-cols-4 gap-4 mx-auto">
        <div>
          <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Total Sales</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${totalSales.toFixed(2)}</h5>
          </a>
        </div>
        <div>
          <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Average Profit</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${averageProfit.toFixed(2)}</h5>
          </a>
        </div>
        <div>
          <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Profit for Today</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${profitForTheDay.toFixed(2)}</h5>
          </a>
        </div>
        <div>
          <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Total Orders</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{totalOrders}</h5>
          </a>
        </div>
      </div>

      <div className="mt-5 mr-6">
        <NewSalesTable sales={latestSales} />
      </div>
      
    </div>
  );
}
