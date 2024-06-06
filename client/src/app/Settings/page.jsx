import React from 'react';

const SettingsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-md p-4">
                <h1 className="text-2xl font-bold mb-4">Accounts</h1>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountName" className="mr-2">Account Type</label>
                    <p>Insert account type here</p>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountEmail" className="mr-2">Account Name</label>
                    <input type="email" id="accountEmail" className="form-input border"></input>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="accountPassword" className="mr-2">Account Password</label>
                    <input type="password" id="accountPassword" className="form-input border" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Add Account</button>
            </div>
        </div>
    );
};


export default SettingsPage;