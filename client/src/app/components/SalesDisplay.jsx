import React, { useState, useEffect } from 'react';

const SalesDisplay = ({ sales, onDelete, onUpdateClick }) => {
  const [sortedSales, setSortedSales] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setSortedSales(sales);
  }, [sales]);

  const sortById = () => {
    const sorted = [...sortedSales].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.id > b.id ? 1 : -1;
      } else {
        return a.id < b.id ? 1 : -1;
      }
    });
    setSortedSales(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : '--';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Sales Data</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th
                className="py-3 px-4 border-b cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200"
                onClick={sortById}
              >
                ID {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th className="py-3 px-4 border-b text-gray-700 bg-gray-100">Type</th>
              <th className="py-3 px-4 border-b text-gray-700 bg-gray-100">Date & Time</th>
              <th className="py-3 px-4 border-b text-gray-700 bg-gray-100">Updated Time</th>
              <th className="py-3 px-4 border-b text-gray-700 bg-gray-100">Quantity</th>
              <th className="py-3 px-4 border-b text-gray-700 bg-gray-100">Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-gray-600">{sale.id}</td>
                <td className="py-2 px-4 border-b text-gray-600">{sale.type}</td>
                <td className="py-2 px-4 border-b text-gray-600">{formatDate(sale.datetime)}</td>
                <td className="py-2 px-4 border-b text-gray-600">{formatDate(sale.updatetime)}</td>
                <td className="py-2 px-4 border-b text-gray-600">{sale.quantity}</td>
                <td className="py-2 px-4 border-b text-gray-600">{sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDisplay;


