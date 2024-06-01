import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = ({ sales }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (sales.length === 0) return;

    const monthlySales = {};

    sales.forEach((sale) => {
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
  }, [sales]);

  return <canvas ref={chartRef} />;
};

export default SalesChart;
