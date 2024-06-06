import React, { useState } from "react";
import { Button } from "@nextui-org/button";

const NewSalesTable = ({ sales, onDelete, onUpdateClick }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleString() : "--";
    };

    const sortedSales = [...sales].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">Checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID
                            <button onClick={() => handleSort('id')}>
                                {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                            <button onClick={() => handleSort('type')}>
                                {sortConfig.key === 'type' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date & Time
                            <button onClick={() => handleSort('datetime')}>
                                {sortConfig.key === 'datetime' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Updated Time
                            <button onClick={() => handleSort('updateTime')}>
                                {sortConfig.key === 'updateTime' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                            <button onClick={() => handleSort('quantity')}>
                                {sortConfig.key === 'quantity' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSales.map((sale) => (
                        <tr key={sale.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {sale.id}
                            </td>
                            <td className="px-6 py-4">
                                {sale.type}
                            </td>
                            <td className="px-6 py-4">
                                {formatDate(sale.datetime)}
                            </td>
                            <td className="px-6 py-4">
                                {formatDate(sale.updateTime)}
                            </td>
                            <td className="px-6 py-4">
                                {sale.quantity}
                            </td>
                            <td className="px-6 py-4">
                                {sale.total}
                            </td>
                            <td className="flex items-center px-6 py-4">
                                <div className="inline-flex rounded-md shadow-sm" role="group">
                                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => onUpdateClick(sale)}>
                                        Update
                                    </button>
                                    
                                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => onDelete(sale.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewSalesTable;
