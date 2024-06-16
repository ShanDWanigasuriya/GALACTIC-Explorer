import React from 'react';
import nasaLogo from '../assets/NASA_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from "../assets/user.png";

const DashboardHeader = ({ name }) => {
    const navigate = useNavigate();

    const handleFavoritesClick = () => {
        navigate('/spaceCollection');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Remove username from localStorage on logout
        navigate('/');
    };

    return (
        <header className="bg-gray-800 text-white py-6 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src={nasaLogo} alt="NASA Logo" className="h-12 mr-4" />
                        <h1 className="text-3xl font-semibold">GALACTIC Explorer</h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <span>
                        <img src={userIcon} alt="User Icon" className="h-6 w-6" />
                    </span>
                    <span><b>Hello,{name}</b></span>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleFavoritesClick}
                    >
                        Favourites
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
