import React, { useState, useEffect } from 'react';

const NASAImageSearch = () => {
    const apiUrl = "https://images-api.nasa.gov/search";
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError] = useState(null);
    const [randomImageIndex, setRandomImageIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDataFromNASA();
    }, []);

    const fetchDataFromNASA = async () => {
        try {
            const response = await fetch(`${apiUrl}?q=apollo&media_type=image`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSearchResults(data.collection.items);

            // Generate a random index within the range of searchResults length
            const randomIndex = Math.floor(Math.random() * data.collection.items.length);
            setRandomImageIndex(randomIndex);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md" style={{ fontFamily: 'Source Sans Pro, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif', color: '#FFFFFF' }}>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    {searchResults && randomImageIndex !== null ? (
                        <div>
                            <div key={randomImageIndex} onClick={handleShowModal} style={{ cursor: 'pointer' }}>
                                {/* Use a higher quality version of the image if available */}
                                <img 
                                    src={searchResults[randomImageIndex].links[0].href} // Use links[0] for simplicity (consider checking for higher quality links)
                                    alt={searchResults[randomImageIndex].data[0].title} 
                                    className="w-full h-auto rounded-lg object-cover mb-3"
                                    style={{ maxHeight: '650px' }}
                                    width="1000" // Specify desired width for better quality (adjust as needed)
                                    height="auto" // Let the browser maintain aspect ratio
                                />
                                <div className="p-4">
                                    <h3 className="text-2xl font-semibold text-white mb-2">{searchResults[randomImageIndex].data[0].title}</h3>
                                    <p className="text-sm text-gray-400 mb-2">Date: {searchResults[randomImageIndex].data[0].date_created}</p>
                                    <p className="text-lg text-white italic leading-relaxed">{searchResults[randomImageIndex].data[0].description}</p>
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2" onClick={() => setRandomImageIndex(Math.floor(Math.random() * searchResults.length))}>
                                Show Another Random Image
                            </button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
                            <div className="bg-white rounded-lg max-w-3xl overflow-hidden">
                                <button className="absolute top-0 right-0 text-white text-xl p-2" onClick={handleCloseModal}>
                                    &times;
                                </button>
                                <img 
                                    src={searchResults[randomImageIndex].links[0].href} 
                                    alt={searchResults[randomImageIndex].data[0].title} 
                                    className="w-full rounded-lg"
                                    style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                                />
                                </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default NASAImageSearch;
