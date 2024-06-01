// "page.js" file
import React from 'react';
import ProfitsByDayChart from './OrdersByDay'; // Fix import statement
import CustomersByDayChart from './CustomersByDay';

const Page = () => {
    return <>
    <h1>PROFITS</h1>
    <ProfitsByDayChart />
    <h1>ORDERS</h1>
    <CustomersByDayChart />
    </>;
}

export default Page;
