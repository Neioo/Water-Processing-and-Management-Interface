import React from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table'
import { Button } from "@nextui-org/button";

const NewSalesTable = ({ sales, onDelete, onUpdateClick }) => {
    const formatDate = (date) => {
        return date ? new Date(date).toLocaleString() : "--";
    }

    return (
        /*<Table aria-label="Water Processing and Management Interface Sales Table" selectionMode="multiple">
            <TableHeader>
                <TableColumn>
                    ID
                </TableColumn>
                <TableColumn>
                    Type
                </TableColumn>
                <TableColumn>
                    Date & Time
                </TableColumn>
                <TableColumn>
                    Updated Time
                </TableColumn>
                <TableColumn>
                    Quantity
                </TableColumn>
                <TableColumn>
                    Total
                </TableColumn>
                <TableColumn>
                    Action
                </TableColumn>
            </TableHeader>
            <TableBody>
                {sales.map((sale) => (
                    <TableRow key={sale.id} className="text-center">
                        <TableCell>{sale.id}</TableCell>
                        <TableCell>{sale.type}</TableCell>
                        <TableCell>{formatDate(sales.datetime).toString()}</TableCell>
                        <TableCell>{formatDate(sale.updateTime).toString()}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell>{sale.total}</TableCell>
                        <TableCell>
                            <Button size="sm" color="primary" onClick={() => onDelete(sale.id)}>
                                Delete
                            </Button>
                            <Button size="sm" color="danger" onClick={() => onUpdateClick(sale)}>
                                Update
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>*/



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                <label for="checkbox-all-search" class="sr-only">Checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date & Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Updated Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {sale.id}
                            </td>
                            <td class="px-6 py-4">
                                {sale.type}
                            </td>
                            <td class="px-6 py-4">
                                {formatDate(sale.datetime).toString()}
                            </td>
                            <td class="px-6 py-4">
                                {formatDate(sale.updateTime).toString()}
                            </td>
                            <td class="px-6 py-4">
                                {sale.quantity}
                            </td>
                            <td class="px-6 py-4">
                                {sale.total}
                            </td>
                            <td class="flex items-center px-6 py-4">
                                <div class="inline-flex rounded-md shadow-sm" role="group">
                                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => onUpdateClick(sale)}>
                                        Update
                                    </button>
                                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => onDelete(sale.id)}>
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