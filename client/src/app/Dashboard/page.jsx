"use client"


import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesDisplay from "../components/SalesDisplay";
import WelcomeName from "../components/WelcomeName";
import NavBar from "@/app/components/Navbar";

export default function Home() {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');

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

    // Fetch user's first name after successful login
    const contactnum = localStorage.getItem('contactnum');
    if (contactnum) {
      axios.get(`http://localhost:8800/accounts?contactnum=${contactnum}`)
        .then(res => {
          const user = res.data[0];
          if (user) {
            setFirstName(user.first_name);
          }
        })
        .catch(err => console.error('Error fetching user data:', err));
    }
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
      <NavBar style={{ width: "100%" }} />
      <div>
        <p className="text-3xl font-bold text-center pt-5 pb-4"><WelcomeName /></p>
        <div className="grid grid-cols-4 gap-4 mx-auto">
          {/* Remaining code */}
        </div>
      </div>
      <div className="flex justify-center items-center mx-20 mt-10 space-x-4">
        <div>
          <a href="#" className="block max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Total Sales</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PHP {totalSales.toFixed(2)}</h5>
          </a>
        </div>
        <div>
          <a href="#" className="block max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Average Profit</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PHP {averageProfit.toFixed(2)}</h5>
          </a>
        </div>
        <div>
          <a href="#" className="block max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Total Orders</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{totalOrders}</h5>
          </a>
        </div>
      </div>
      <div className="mt-5 mx-20">
        <SalesDisplay sales={latestSales} />
      </div>
    </div>
  );
}
