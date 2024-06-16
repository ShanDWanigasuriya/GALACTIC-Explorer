import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import spaceBackground from '../assets/space_background.jpg';
import nasaLogo from '../assets/NASA_logo.png';

const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await api.post('/signup', { name, email, password });

            if (res.data === 'User created successfully') {
                alert("User created successfully");
                navigate("/signin");
            } else if (res.data === 'User already exists') {
                alert("User already exists");
            }
        } catch (error) {
            alert("Error occurred");
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-space-bg" style={{ backgroundImage: `url(${spaceBackground})`, backgroundSize: 'cover' }}>
            <div className="bg-white shadow-md rounded-lg px-8 py-8 w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link to={{ pathname: "/" }} className="flex items-center">
                        <img src={nasaLogo} alt="NASA Logo" className="w-24 mx-auto mb-4" />
                    </Link>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Galactic Explorer</h2>
                    <p className="text-lg text-gray-500 font-semibold mb-6 leading-normal px-8">Explore the universe with NASA APIs</p>
                </div>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="name">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <div className="text-center mt-4">
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to="/signin"
                        >
                            Already have an account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
