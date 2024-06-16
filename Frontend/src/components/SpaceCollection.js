import React, { useState, useEffect } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import spaceBackground from '../assets/space_background.jpg';

const SpaceCollection = ({ collectionName }) => {
    const [images, setImages] = useState([]);
    const [activeTab, setActiveTab] = useState('APOD'); // Default tab
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = !!localStorage.getItem('token');

        // If user is not authenticated, redirect to the login page
        if (!isAuthenticated) {
            navigate('/signin'); // Redirect to the login page
        } else {
            // Fetch images if user is authenticated
            fetchImages();
        }
    }, []);

    const fetchImages = async () => {
        try {
            const response = await api.get('/spaceCollection/all');
            console.log(response);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const filteredImagesByCollection = (targetCollection) => {
        return images.filter(image => image.collection === targetCollection);
    };

    const handleDeleteImage = async (id) => {
        try {
            await api.delete(`/spaceCollection/delete/${id}`);
            setImages(images.filter(image => image._id !== id));
            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const collectionTypes = [
        { key: 'APOD', label: 'APOD' },
        { key: 'EPIC', label: 'EPIC' },
        { key: 'Mars Rover Photos', label: 'MARS ROVER PHOTOS' }
    ];

    return (
        <div className="min-h-screen bg-space-bg" style={{ backgroundImage: `url(${spaceBackground})`, backgroundSize: 'cover' }}>
            <Header /><br /><br /><br /><br />
            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <ul className="flex">
                        {collectionTypes.map((collectionType) => (
                            <li
                                key={collectionType.key}
                                className={`mr-4 cursor-pointer text-xl font-semibold text-white ${activeTab === collectionType.key ? 'border-b-2 border-white' : ''}`}
                                onClick={() => setActiveTab(collectionType.key)}
                            >
                                {collectionType.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredImagesByCollection(activeTab).map(image => (
                            <div key={image._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <img src={image.imageUrl} alt={image.title} className="h-64 w-full object-cover" />
                                <div className="p-4">
                                    <p className="text-lg font-semibold text-gray-800">{image.title}</p>
                                    <h3 className="text-lg text-gray-500 font-semibold mb-2 leading-normal">{image.idNo && `(${image.idNo})`}</h3>

                                    <button onClick={() => handleDeleteImage(image._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SpaceCollection;
