import React, { useState } from 'react';
import nasaLogo from '../assets/NASA_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from "../assets/user.png";

const FHeader = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const username = localStorage.getItem('name');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            // Navigate to spaceCollectionNew route with searchQuery passed as URL parameter
            navigate(`/spaceCollectionNew?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleDashboardClick = () => {
        navigate("/dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <header className="bg-gray-800 text-white py-6 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center">
                    <Link to={{ pathname: "/"}} className="flex items-center">
                        <img src={nasaLogo} alt="NASA Logo" className="h-12 mr-4" />
                        <h1 className="text-3xl font-semibold">GALACTIC Explorer</h1>
                    </Link>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2 w-1/2">
                    <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500 bg-transparent text-white w-full"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg ml-2">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <span>
                        <img src={userIcon} alt="User Icon" className="h-6 w-6" />
                    </span>
                    <span><b>Hello,{username}</b></span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDashboardClick}>Dashboard</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
};

export default FHeader;
