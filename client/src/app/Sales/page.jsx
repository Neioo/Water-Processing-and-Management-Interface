// pages/sales.js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalesTable from '../components/SalesTable';

const Sales = () => {
  const [sales, setSales] = useState([]);

    useEffect(()=>{
        const fetchAllSales = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/sales")
                setSales(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllSales()
    })


  return <SalesTable sales={sales} />;
};

export default Sales;
