import React, { useState, useEffect } from 'react';

const NEOs = () => {
    const [neosData, setNEOsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetchNEOsData();
    }, []);

    const fetchNEOsData = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch NEOs data');
            }
            const data = await response.json();
            setNEOsData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching NEOs data:', error);
            setLoading(false);
        }
    };

    const displayNEOs = () => {
        if (!neosData) return [];

        const allNEOs = Object.entries(neosData.near_earth_objects).flatMap(([date, neos]) => (
            neos.map(neo => ({ date, ...neo }))
        ));

        const startIndex = (currentPage - 1) * 6;
        const endIndex = startIndex + 6;
        return allNEOs.slice(startIndex, endIndex);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="text-white flex justify-center items-center h-full bg-gray-800 py-8">
            {loading ? (
                <p className="text-white animate-pulse">Loading NEOs data...</p>
            ) : (
                <div className="text-center w-full">
                    <h2 className="text-4xl font-bold md:text-5xl text-white">
                        AVAILABLE RECORDS OF {displayNEOs()[0]?.date}
                    </h2><br></br>
                    {displayNEOs().map((neo, index) => (
                        <div key={index} className="mb-4 bg-gray-700 p-4 rounded-lg">
                            <p className="text-xl font-semibold text-white">Name: {neo.name}</p>
                            <p className="text-lg text-white">
                                Estimated Diameter: {`${neo.estimated_diameter.feet.estimated_diameter_min} - ${neo.estimated_diameter.feet.estimated_diameter_max}`} feet
                            </p>
                        </div>
                    ))}
                    <div>
                        {currentPage > 1 && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
                                onClick={handlePrevPage}
                            >
                                Previous Page
                            </button>
                        )}
                        {displayNEOs().length === 6 && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={handleNextPage}
                            >
                                Next Page
                            </button>
                        )}
                    </div>
                    {displayNEOs().length === 0 && (
                        <p className="text-white mt-4">No NEOs to display.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NEOs;