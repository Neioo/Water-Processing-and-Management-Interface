"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function ProfitsByDayChart() {
    const [data, setData] = useState([]);
    const [view, setView] = useState('daily'); // State to keep track of the selected view
    const [month, setMonth] = useState(''); // State to keep track of the selected month

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8800/sales'); // Adjust URL accordingly
                const salesData = response.data;
                updateData(salesData, view, month);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [view, month]); // Re-fetch data when the view or month changes

    const updateData = (salesData, view, month) => {
        let aggregatedData;
        switch (view) {
            case 'yearly':
                aggregatedData = groupDataByYear(salesData);
                break;
            case 'monthly':
                aggregatedData = groupDataByMonth(salesData, month);
                break;
            case 'weekly':
                aggregatedData = groupDataByWeek(salesData);
                break;
            case 'daily':
            default:
                aggregatedData = groupDataByDay(salesData);
                break;
        }
        setData(aggregatedData);
    };

    // Aggregation functions
    const groupDataByDay = (salesData) => {
        const dailySales = {};
        salesData.forEach(sale => {
            const date = new Date(sale.datetime).toLocaleDateString('en-US');
            if (!dailySales[date]) {
                dailySales[date] = {
                    date: date,
                    total: 0
                };
            }
            dailySales[date].total += parseFloat(sale.total); // Assuming 'total' represents profit
        });
        return Object.values(dailySales);
    };

    const groupDataByWeek = (salesData) => {
        const weeklySales = {};
        salesData.forEach(sale => {
            const week = getWeek(new Date(sale.datetime));
            if (!weeklySales[week]) {
                weeklySales[week] = {
                    week: week,
                    total: 0
                };
            }
            weeklySales[week].total += parseFloat(sale.total); // Assuming 'total' represents profit
        });
        return Object.values(weeklySales);
    };

    const groupDataByMonth = (salesData, selectedMonth) => {
        const monthlySales = {};
        salesData.forEach(sale => {
            const date = new Date(sale.datetime);
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (selectedMonth && month !== selectedMonth) return;
            const day = date.getDate();
            const dayKey = `${month}-${String(day).padStart(2, '0')}`;
            if (!monthlySales[dayKey]) {
                monthlySales[dayKey] = {
                    date: dayKey,
                    total: 0
                };
            }
            monthlySales[dayKey].total += parseFloat(sale.total); // Assuming 'total' represents profit
        });
        return Object.values(monthlySales);
    };

    const groupDataByYear = (salesData) => {
        const yearlySales = {};
        salesData.forEach(sale => {
            const year = new Date(sale.datetime).getFullYear();
            if (!yearlySales[year]) {
                yearlySales[year] = {
                    year: year,
                    total: 0
                };
            }
            yearlySales[year].total += parseFloat(sale.total); // Assuming 'total' represents profit
        });
        return Object.values(yearlySales);
    };

    const getWeek = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return `${date.getFullYear()}-W${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
    };

    const renderMonthDropdown = () => {
        const months = [
            { value: '2024-01', label: 'January 2024' },
            { value: '2024-02', label: 'February 2024' },
            { value: '2024-03', label: 'March 2024' },
            { value: '2024-04', label: 'April 2024' },
            { value: '2024-05', label: 'May 2024' },
            { value: '2024-06', label: 'June 2024' },
            { value: '2024-07', label: 'July 2024' },
            { value: '2024-08', label: 'August 2024' },
            { value: '2024-09', label: 'September 2024' },
            { value: '2024-10', label: 'October 2024' },
            { value: '2024-11', label: 'November 2024' },
            { value: '2024-12', label: 'December 2024' },
            // Add more months as needed
        ];

        return (
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Select Month</option>
                {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                ))}
            </select>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <select value={view} onChange={(e) => setView(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                {view === 'monthly' && renderMonthDropdown()}
            </div>
            <ResponsiveContainer width="100%" minHeight={500}>
                <LineChart data={data} width={500} height={100}>
                    <CartesianGrid />
                    <XAxis dataKey={view === 'weekly' ? 'week' : view === 'monthly' ? 'date' : view === 'yearly' ? 'year' : 'date'} name="Date"/>
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="total" type="monotone" name="Total Profits" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
