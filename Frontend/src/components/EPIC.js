import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const EPIC = () => {
    const [randomPhoto, setRandomPhoto] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetchEPICData();
    }, []);

    const fetchEPICData = async () => {
        try {
            const response = await axios.get(`https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`);
            if (!response.data || response.data.length === 0) {
                throw new Error('Failed to fetch EPIC data');
            }
            console.log(response);
            const randomIndex = Math.floor(Math.random() * response.data.length);
            setRandomPhoto(response.data[randomIndex]);
        } catch (error) {
            console.error('Error fetching EPIC data:', error);
        }
    };

    const addToFavorites = async () => {
        try {
            if (!randomPhoto) {
                console.error('randomPhoto data is not available.');
                return;
            }

            const idNo = randomPhoto.identifier;
            const title = randomPhoto.caption;
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${randomPhoto.date.slice(0, 4)}/${randomPhoto.date.slice(5, 7)}/${randomPhoto.date.slice(8, 10)}/png/${randomPhoto.image}.png`;
            const collection = 'EPIC';

            const response = await api.post('/spaceCollection/add', {idNo, title, imageUrl, collection});
            
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
            {randomPhoto ? (
                <div>
                    <img
                        src={`https://epic.gsfc.nasa.gov/archive/natural/${randomPhoto.date.slice(0, 4)}/${randomPhoto.date.slice(5, 7)}/${randomPhoto.date.slice(8, 10)}/png/${randomPhoto.image}.png`}
                        alt={randomPhoto.caption}
                        className="w-full h-auto rounded-lg object-cover mb-3"
                        style={{ maxHeight: '650px' }}
                    />
                    <div className="p-4">
                        <h4 className="text-2xl font-semibold text-white mb-2">{randomPhoto.caption}</h4>
                        <h3 className="text-1xl font-semibold text-white mb-2">({randomPhoto.identifier})</h3>
                        <p className="text-sm text-gray-400 mb-2">Date: {randomPhoto.date}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default EPIC;
