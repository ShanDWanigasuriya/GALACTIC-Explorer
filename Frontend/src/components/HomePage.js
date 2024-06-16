import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import spaceBackground from "../assets/space_background.jpg";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-lg bg-gray-900 bg-opacity-90 p-12 rounded-lg text-center text-white">
        <Header />
        <h1
          className="text-5xl font-semibold mb-6 leading-tight"
          style={{
            fontFamily: "Helvetica Neue, Helvetica, Roboto, Arial, sans-serif",
            lineHeight: 1.2,
            WebkitFontSmoothing: "antialiased",
            fontSize: "4rem", // Increase the font size (height) of the h1 heading
          }}
        >
          WELCOME TO GALACTIC EXPLORER
        </h1>
        <p className="text-lg text-gray-300 font-semibold mb-6 leading-normal px-8">
          (Powered by NASA APIs)<br></br>
        </p>
        <p className="text-lg text-gray-300 font-semibold mb-6 leading-normal px-8">
          Embark on a journey through space and discover the wonders of the
          universe! Explore distant galaxies, marvel at breathtaking nebulae,
          and witness the beauty of our solar system.
        </p>

        <Link to={token ? "/dashboard" : "/signin"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg mt-4 text-xl transition duration-300 shadow-xl">
            <h1
              className="text-3xl font-semibold mb-2 leading-tight"
              style={{
                fontFamily:
                  "Helvetica Neue, Helvetica, Roboto, Arial, sans-serif",
              }}
            >
              Explore Now
            </h1>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
