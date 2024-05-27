"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from '@/app/components/UpdateForm';

export default function Update({ params }) {
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/sales/${params.id}`);
        setSale(res.data);
      } catch (err) {
        setError(err.response ? err.response.data : 'Error fetching sale data');
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  

  return <UpdateForm sale={sale} />;
}