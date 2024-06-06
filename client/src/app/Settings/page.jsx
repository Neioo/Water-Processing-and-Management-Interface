"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ToastNotifications from '../components/Toast'

const SettingsPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({ type: '', first_name: '', last_name: '', contactnum: '', password: '' });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8800/accounts');
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/accounts/${id}`);
            fetchAccounts();
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleAddAccount = async () => {
        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newAccount.password)) {
            toast.error('Password must contain at least 1 capital letter, 1 number, and be at least 8 characters long');
            console.error('Password must contain at least 1 capital letter, 1 number, and be at least 8 characters long');
            return;
        }
    
        // Contact number validation
        const contactNumRegex = /^\d{11}$/;
        if (!contactNumRegex.test(newAccount.contactnum)) {
            toast.error('Contact number must be exactly 11 digits long');
            console.error('Contact number must be exactly 11 digits long');
            return;
        }
    
        try {
            await axios.post('http://localhost:8800/accounts', newAccount);
            setNewAccount({ type: '', first_name: '', last_name: '', contactnum: '', password: '' });
            fetchAccounts();
            toast.success('Transaction added successfully');
        } catch (error) {
            console.error('Error adding account:', error);
            toast.error('Error adding account');
        }
    };

    

    return ( 
        <div className="container mx-auto p-4">
            <ToastNotifications />
            <div className="bg-white shadow-md rounded-md p-4">
                <h1 className="text-2xl font-bold mb-4">Accounts</h1>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountType" className="mr-2">Account Type:</label>
                    <select
                        id="accountType"
                        value={newAccount.type}
                        onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                        className="form-select border"
                    >
                        <option value="">Select Account Type</option>
                        <option value="admin">Admin</option>
                        <option value="operator">Operator</option>
                    </select>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountFirstName" className="mr-2">First Name:</label>
                    <input
                        type="text"
                        id="accountFirstName"
                        value={newAccount.first_name}
                        onChange={(e) => setNewAccount({ ...newAccount, first_name: e.target.value })}
                        className="form-input border"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountLastName" className="mr-2">Last Name:</label>
                    <input
                        type="text"
                        id="accountLastName"
                        value={newAccount.last_name}
                        onChange={(e) => setNewAccount({ ...newAccount, last_name: e.target.value })}
                        className="form-input border"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountContactNum" className="mr-2">Contact Number:</label>
                    <input
                        type="text"
                        id="accountContactNum"
                        value={newAccount.contactnum}
                        onChange={(e) => setNewAccount({ ...newAccount, contactnum: e.target.value })}
                        className="form-input border"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountPassword" className="mr-2">Account Password:</label>
                    <input
                        type="password"
                        id="accountPassword"
                        value={newAccount.password}
                        onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                        className="form-input border"
                    />
                </div>
                <button
                    onClick={handleAddAccount}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    Add Account
                </button>
                <table className="w-full mt-8">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Account Type</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Contact Number</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                <td className="border px-4 py-2">{account.id}</td>
                                <td className="border px-4 py-2">{account.type}</td>
                                <td className="border px-4 py-2">{account.first_name}</td>
                                <td className="border px-4 py-2">{account.last_name}</td>
                                <td className="border px-4 py-2">{account.contactnum}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteAccount(account.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mr-2"
                                    >
                                        Delete
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

export default SettingsPage;