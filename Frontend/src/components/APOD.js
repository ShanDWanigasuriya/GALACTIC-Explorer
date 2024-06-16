import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';

const APOD = () => {
    const [apodData, setAPODData] = useState(null);
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetchAPODData();
    }, []);

    const fetchAPODData = async () => {
        try {
            const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
            if (!response.data) {
                throw new Error('Failed to fetch APOD data');
            }
            console.log(response);
            setAPODData(response.data);
        } catch (error) {
            console.error('Error fetching APOD data:', error);
        }
    };

    const addToFavorites = async () => {
        try {
            if (!apodData) {
                console.error('APOD data is not available.');
                return;
            }

            const idNo = apodData.copyright;
            const title = apodData.title;
            const imageUrl = apodData.url;
            const collection = 'APOD';
    
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
            {apodData ? (
                <div>
                    <img
                        src={apodData.url}
                        alt={apodData.title}
                        className="w-full h-auto rounded-lg object-cover mb-3"
                        style={{ maxHeight: '500px' }}
                    />
                    <div className="p-4">
                        <h3 className="text-2xl font-semibold text-white mb-2">{apodData.title}</h3>
                        <h3 className="text-1xl font-semibold text-white mb-2">({apodData.copyright})</h3>
                        <p className="text-sm text-gray-400 mb-2">Date: {apodData.date}</p>
                        <p className="text-lg text-white italic leading-relaxed">{apodData.explanation}</p>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default APOD;
