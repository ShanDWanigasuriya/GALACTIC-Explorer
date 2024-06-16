import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const MarsRoverPhotos = () => {
    const [roverData, setRoverData] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetchRoverData();
    }, []);

    const fetchRoverData = async () => {
        try {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${apiKey}`);
            if (!response.data || response.data.photos.length === 0) {
                throw new Error('Failed to fetch Mars rover photos data');
            }
            console.log(response);
            const randomIndex = Math.floor(Math.random() * response.data.photos.length);
            const randomPhoto = response.data.photos[randomIndex];
            setRoverData(randomPhoto);
        } catch (error) {
            console.error('Error fetching Mars rover photos data:', error);
        }
    };

    const addToFavorites = async () => {
        try {
            if (!roverData) {
                console.error('rover data is not available.');
                return;
            }

            const idNo = roverData.id;
            const title = roverData.camera.full_name;
            const imageUrl = roverData.img_src;
            const collection = 'Mars Rover Photos';
            
            const response = await api.post('/spaceCollection/add', { idNo, title, imageUrl, collection });
            
            if (response && response.data) {
                console.log('Added to favorites:', title);
                // Navigate to SpaceCollection page after adding to favorites
                navigate('/spaceCollection');
            } else {
                console.error('Failed to add to favorites. Invalid response:', response);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            console.error('Error details:', error.response); // Print detailed error information
        }
    };

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md" style={{ fontFamily: 'Source Sans Pro, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif', color: '#FFFFFF' }}>
            {roverData ? (
                <div>
                    <img 
                        src={roverData.img_src} 
                        alt={roverData.id} 
                        className="w-full h-auto rounded-lg object-cover mb-6" 
                        style={{ maxHeight: '500px' }} 
                    />
                    <div className="p-4">
                        <h3 className="text-2xl font-semibold text-white mb-2">{roverData.camera.full_name}</h3>
                        <h3 className="text-1xl font-semibold text-white mb-2">({roverData.id})</h3>
                        <p className="text-sm text-gray-400 mb-2">Earth Date: {roverData.earth_date}</p>
                        <p className="text-lg text-white italic leading-relaxed mb-1">Sol: {roverData.sol}</p>
                        <p className="text-lg text-white italic leading-relaxed mb-1">Rover: {roverData.rover.name}</p>
                        <p className="text-lg text-white italic leading-relaxed mb-1">Launch Date: {roverData.rover.launch_date}</p>
                        <p className="text-lg text-white italic leading-relaxed mb-4">Landing Date: {roverData.rover.landing_date}</p>
                        <button
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addToFavorites}
                        >
                            Add to Favorites
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </div>
    );
}

export default MarsRoverPhotos;
