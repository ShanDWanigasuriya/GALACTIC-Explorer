import React, { useState, useEffect } from 'react';
import api from './api';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import spaceBackground from '../assets/space_background.jpg';

const SpaceCollectionNew = () => {
    const [images, setImages] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    console.log(query);

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = !!localStorage.getItem('token');

        // If user is not authenticated, redirect to the login page
        if (!isAuthenticated) {
            navigate('/signin'); // Redirect to the login page
        } else {
            // Fetch images if user is authenticated
            // Function to fetch images based on collection and search query
            const fetchImages = async () => {
                try {
                    let response;
                    if (query) {
                        response = await api.get(`/spaceCollection/searchbyAny/${query}`);
                    }
                    setImages(response.data);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            };
            
            fetchImages(); // Call fetchImages directly inside useEffect
            }
    }, [query]); // Dependencies for useEffect

    return (
        <div className="min-h-screen bg-space-bg" style={{ backgroundImage: `url(${spaceBackground})`, backgroundSize: 'cover' }}>
            <Header /><br></br><br></br><br></br><br></br>
            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-bold text-white mb-4" style={{ color: 'white', fontWeight: '500', textAlign: 'center' }}>IMAGE WITH ACTUAL PARAMETERS</h2>
                <div className="grid-cols-1 md:grid-cols-3 justify-center">
                    {images.map(image => (
                        <div key={image._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img
                                src={image.imageUrl}
                                alt={image.title}
                                className="h-auto w-full object-contain" // Use 'h-auto' and 'w-full' to maintain original size
                            />
                            <div className="p-4">
                                <p className="text-lg text-gray-500 font-semibold leading-normal px-8"><center>{image.title}</center></p>
                                <p className="text-lg text-gray-500 font-semibold leading-normal px-8"><center>({image.idNo})</center></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpaceCollectionNew;
