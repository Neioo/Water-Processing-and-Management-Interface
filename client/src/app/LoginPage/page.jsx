"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

function LoginPage() {
    const router = useRouter()

    const [contactnum, setContactnum] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const expectedContactNum = '1234567890'; // Replace with the expected phone number
        const expectedPassword = 'password123'; // Replace with the expected password

        console.log('Contact Number:', contactnum);
        console.log('Password:', password);

        try {
            if (contactnum === expectedContactNum && password === expectedPassword) {
                console.log('Login successful');
                router.push('/Dashboard');
            } else {
                setError('Invalid phone number or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            console.error('Error response:', error.response);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="phonenum" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                        <div className="mt-2">
                            <input id="phonenum" name="phonenum" type="text" autoComplete="phonenum" value={contactnum} onChange={(e) => setContactnum(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Cannot remember your password? Consult with your administrator.
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
