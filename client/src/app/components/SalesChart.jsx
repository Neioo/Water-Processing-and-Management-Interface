import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = ({ sales }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [filteredSales, setFilteredSales] = useState(sales);
  const [filter, setFilter] = useState({
    category: 'All',
    sortBy: 'id',
    order: 'asc'
  });

  useEffect(() => {
    applyFilters();
  }, [sales, filter]);

  useEffect(() => {
    if (filteredSales.length === 0) return;

    const monthlySales = {};

    filteredSales.forEach((sale) => {
      const month = new Date(sale.datetime).toLocaleString('en-US', { month: 'short' });
      if (!monthlySales[month]) {
        monthlySales[month] = 0;
      }
      monthlySales[month] += parseFloat(sale.total);
    });

    const labels = Object.keys(monthlySales);
    const data = Object.values(monthlySales);

    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Total Sales',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Return cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [filteredSales]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let updatedSales = [...sales];

    // Filter by category
    if (filter.category !== 'All') {
      updatedSales = updatedSales.filter((sale) => sale.type === filter.category);
    }

    // Sort by the selected field and order
    updatedSales.sort((a, b) => {
      let comparison = 0;

      if (filter.sortBy === 'id') {
        comparison = a.id - b.id;
      } else if (filter.sortBy === 'name') {
        comparison = a.type.localeCompare(b.type);
      } else if (filter.sortBy === 'date') {
        comparison = new Date(a.datetime) - new Date(b.datetime);
      }

      return filter.order === 'asc' ? comparison : -comparison;
    });

    setFilteredSales(updatedSales);
  };

  return (
    <div>
      <div className="filter-container">
        <label>
          Category:
          <select name="category" value={filter.category} onChange={handleFilterChange}>
            <option value="All">All</option>
            {/* Add other categories as needed */}
            {sales.map((sale) => (
              <option key={sale.id} value={sale.type}>
                {sale.type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort By:
          <select name="sortBy" value={filter.sortBy} onChange={handleFilterChange}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
        </label>
        <label>
          Order:
          <select name="order" value={filter.order} onChange={handleFilterChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default SalesChart;
