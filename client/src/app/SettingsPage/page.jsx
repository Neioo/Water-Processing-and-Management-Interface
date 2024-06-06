"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "@/app/components/Navbar";

const SettingsPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({ type: '', first_name: '', last_name: '', contactnum: '', password: '' });

    let params = new URLSearchParams(window.location.search);
    let type = params.get("type");

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

    const handleUpdateAccount = async (id, updatedAccount) => {
        try {
            await axios.put(`http://localhost:8800/accounts/${id}`, updatedAccount);
            fetchAccounts();
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const handleAddAccount = async () => {
        try {
            await axios.post('http://localhost:8800/accounts', newAccount);
            setNewAccount({ type: '', first_name: '', last_name: '', contactnum: '', password: '' });
            fetchAccounts();
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    function ShowAccountDetails() {
        if (type === "admin") {
            return (
                <div>
                    <div>
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
                    </div>
                </div>
            );
        } else {
            return (
                <p>You do not have the necessary permissions to access this data</p>
            );
        }
    }

    function TableHeaderModifications() {
        if (type === "admin") {
            return (
                <th className="px-4 py-2">Actions</th>
            )
        }
    }

    function TableModifications({ accountid }) {
        if (type === "admin") {
            return (
                <td className="border px-4 py-2">
                    <button
                        onClick={() => handleDeleteAccount(accountid)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mr-2"
                    >
                        Delete
                    </button>
                </td>
            )
        }
    }

    return (
        <>
            <NavBar style={{ width: "100% " }} />
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-4">Accounts</h1>
                    <ShowAccountDetails />
                    <table className="w-full mt-8">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Account Type</th>
                                <th className="px-4 py-2">First Name</th>
                                <th className="px-4 py-2">Last Name</th>
                                <th className="px-4 py-2">Contact Number</th>
                                <TableHeaderModifications />
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
                                    <TableModifications accountid={account.id} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;