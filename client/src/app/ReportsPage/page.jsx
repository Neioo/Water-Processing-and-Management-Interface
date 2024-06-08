import React from 'react';
import CustomersByDayChart from '../charts/CustomersByDay';
import ProfitsByDayChart from '../charts/OrdersByDay';
import NavBar from "@/app/components/Navbar";

const ReportsPage = () => {
  return (
    <>
    <div className="p-6 bg-gray-100 min-h-screen mx-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Reports</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Profits</h2>
        <div className="overflow-x-auto">
          <ProfitsByDayChart />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sales</h2>
        <div className="overflow-x-auto">
          <CustomersByDayChart />
        </div>
      </div>
    </div>
    </>

  );
}

export default ReportsPage;
