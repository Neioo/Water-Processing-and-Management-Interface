// Update.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from '@/app/components/UpdateForm';

const Update = () => {
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

  return (
    <div>
      {sales.map((sale) => (
        <UpdateForm key={sale.id} sale={sale} />
      ))}
    </div>
  );
};

export default Update;


