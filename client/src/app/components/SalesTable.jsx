import React from 'react';
import Link from 'next/link';

const SalesTable = ({ sales, onDelete }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sales Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Date & Time</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="py-2 px-4 border">{sale.id}</td>
                <td className="py-2 px-4 border">{sale.type}</td>
                <td className="py-2 px-4 border">{new Date(sale.datetime).toLocaleString()}</td>
                <td className="py-2 px-4 border">{sale.quantity}</td>
                <td className="py-2 px-4 border">{sale.total}</td>
                <td className="py-2 px-4 border flex space-x-2">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => onDelete(sale.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                   
                  >
                    <Link href={`/Update/${sale.id}`}>Update</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;




