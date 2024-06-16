import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import nasaLogo from "../assets/NASA_logo.png";
import userIcon from "../assets/user.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Check if the user is authenticated based on the presence of token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  const username = localStorage.getItem("name"); // Retrieve the username from localStorage

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

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleFavoritesClick = () => {
    navigate("/spaceCollection");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Remove username from localStorage on logout
    navigate("/");
  };

  // Determine whether to show full features based on the current location
  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname === "/dashboard";
  const isFavoritesPage = location.pathname === "/spaceCollection";
  const isOneImagePage = location.pathname === "/spaceCollectionNew";

  return (
    <header className="bg-gray-800 text-white py-6 fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        {isAuthenticated && (isHomePage || isDashboardPage) && (
          // Show full features on homepage and dashboard
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
              <span>
                <b>Hello,{username}</b>
              </span>
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
        )}
        {isAuthenticated && isFavoritesPage && (
          // Show specific features on favorites page
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center">
              <Link to={{ pathname: "/" }} className="flex items-center">
                <img src={nasaLogo} alt="NASA Logo" className="h-12 mr-4" />
                <h1 className="text-3xl font-semibold">GALACTIC Explorer</h1>
              </Link>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2 w-1/2">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center w-full"
              >
                <input
                  type="text"
                  placeholder="If you want explore a particular image with it's actual ratios search that image by ID"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500 bg-transparent text-white w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg ml-2"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 19l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span>
                <img src={userIcon} alt="User Icon" className="h-6 w-6" />
              </span>
              <span>
                <b>Hello,{username}</b>
              </span>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDashboardClick}
              >
                Dashboard
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {isAuthenticated && isOneImagePage && (
          // Show specific features on One Image page
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center">
              <Link to={{ pathname: "/" }} className="flex items-center">
                <img src={nasaLogo} alt="NASA Logo" className="h-12 mr-4" />
                <h1 className="text-3xl font-semibold">GALACTIC Explorer</h1>
              </Link>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span>
                <img src={userIcon} alt="User Icon" className="h-6 w-6" />
              </span>
              <span>
                <b>Hello,{username}</b>
              </span>
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
        )}
        {!isAuthenticated && (
          // Show sign-in and sign-up buttons if not authenticated
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center">
              <Link to={{ pathname: "/" }} className="flex items-center">
                <img src={nasaLogo} alt="NASA Logo" className="h-12 mr-4" />
                <h1 className="text-3xl font-semibold">GALACTIC Explorer</h1>
              </Link>
            </div>
            <div className="flex items-center">
              <>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-4" onClick={handleSignInClick}>
                    Sign In
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
              </>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
