import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

class CSVExport extends React.Component {
    exportToCSV = async () => {
        try {
            // Make a request to your MySQL API to fetch the sales data
            const response = await axios.get('http://localhost:8800/sales');

            // Extract the sales data from the response
            const salesData = response.data;

            // Convert the sales data to CSV format
            const csvData = this.convertToCSV(salesData);

            // Create a Blob object with the CSV data
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

            // Save the Blob object as a CSV file
            saveAs(blob, 'sales_data.csv');
        } catch (error) {
            console.error('Error exporting sales data:', error);
        }
    };

    convertToCSV = (data) => {
        const csvRows = [];

        // Add the header row
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Add the data rows
        data.forEach((row) => {
            const values = headers.map((header) => row[header]);
            csvRows.push(values.join(','));
        });

        // Join all the rows with line breaks
        return csvRows.join('\n');
    };

    render() {
        return (
            <div className="mt-5">
                <button
                    onClick={this.exportToCSV}
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                >
                    Export to CSV
                </button>
            </div>
        );
    }
}

export default CSVExport;
