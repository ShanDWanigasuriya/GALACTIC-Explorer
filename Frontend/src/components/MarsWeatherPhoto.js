import React, { useState, useEffect } from 'react';

const InSightWeather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchMarsWeatherData();
    }, []);

    const fetchMarsWeatherData = async () => {
        try {
            const response = await fetch('https://api.nasa.gov/insight_weather/?api_key=if4s0Pz6Y2iDSCN1foP1VYZGl4wlevlRSQ1nuLSe&feedtype=json&ver=1.0');
            if (!response.ok) {
                throw new Error('Failed to fetch Mars weather data');
            }
            const data = await response.json();
            console.log(data); // Log the API response

            // Check if data is empty or does not have any sol keys
            if (Object.keys(data).length === 0) {
                throw new Error('No weather data available');
            }

            // Get the latest sol (Martian day) key
            const latestSolKey = Object.keys(data)[0];
            const latestWeather = data[latestSolKey];

            setWeatherData(latestWeather);
        } catch (error) {
            console.error('Error fetching Mars weather data:', error);
        }
    };

    return (
        <div>
            {weatherData ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Latest Mars Weather</h2>
                    <p className="text-gray-600 mb-2">Sol Date: {weatherData.First_UTC}</p>
                    {weatherData.PRE && <p className="text-gray-600 mb-2">Atmospheric Pressure (Pa): {weatherData.PRE.avg?.toFixed(2)}</p>}
                    {weatherData.HWS && <p className="text-gray-600 mb-2">Wind Speed (m/s): {weatherData.HWS.avg?.toFixed(2)}</p>}
                    {weatherData.AT && <p className="text-gray-600 mb-2">Temperature (°C): {weatherData.AT.av?.toFixed(2)}</p>}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default InSightWeather;
