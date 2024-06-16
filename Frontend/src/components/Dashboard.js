import React, { useState } from 'react';
import APOD from './APOD';
import MarsRoverPhotos from './MarsRoverPhotos';
import NEOs from './NEOs';
import EPIC from './EPIC';
import IVL from './IVL';
import Header from './Header';
import spaceBackground from '../assets/space_background.jpg';

const Dashboard = () => {
    const [selectedModule, setSelectedModule] = useState('APOD');
    const name = localStorage.getItem('name');

    const handleModuleChange = (module) => {
        setSelectedModule(module);
    };

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Header name={name}/><br></br><br></br><br></br><br></br>
            <div className="flex" style={{ height: 'calc(100vh - 6rem)' }}>
                <div className="w-1/4 bg-gray-200" style={{ backgroundImage: `url(${spaceBackground})`, backgroundSize: 'cover' }}>
                    <Sidebar handleModuleChange={handleModuleChange} />
                </div>
                <div className="w-3/4 bg-gray-100 overflow-auto pl-4" style={{ backgroundImage: `url(${spaceBackground})`, backgroundSize: 'cover' }}>
                    <div className="container mx-auto py-10">
                        {selectedModule === 'APOD' && <APOD />}
                        {selectedModule === 'MarsRoverPhotos' && <MarsRoverPhotos />}
                        {selectedModule === 'NEOs' && <NEOs />}
                        {selectedModule === 'EPIC' && <EPIC />}
                        {selectedModule === 'IVL' && <IVL />}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Sidebar = ({ handleModuleChange }) => {
    const sidebarStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Occupy full height of the sidebar container
        padding: '2rem 0', // Add padding to space out the buttons vertically
    };    

    const buttonStyles = {
        width: '80%',
        fontSize: '1.2rem',
        padding: '1.5rem 0',
        backgroundColor: '#4A5568',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '1rem', // Add margin bottom to create space between buttons
        transition: 'background-color 0.3s ease-in-out',
        fontWeight: 'bold', // Make buttons bold
    };    

    const buttonHoverStyles = {
        backgroundColor: '#2D3748',
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = buttonHoverStyles.backgroundColor;
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = buttonStyles.backgroundColor;
    };

    return (
        <div className="py-10" style={sidebarStyles}>
            <button
                style={buttonStyles}
                onClick={() => handleModuleChange('APOD')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Astronomy Picture of the Day
                <h3 className="text-1xl font-semibold text-white mb-2">(Powered by NASA APOD API)</h3>
            </button>
            <button
                style={buttonStyles}
                onClick={() => handleModuleChange('MarsRoverPhotos')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Mars Rover Photos
                <h3 className="text-1xl font-semibold text-white mb-2">(Powered by NASA Mars Rover Photos API)</h3>
            </button>
            <button
                style={buttonStyles}
                onClick={() => handleModuleChange('NEOs')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Near Earth Objects
                <h3 className="text-1xl font-semibold text-white mb-2">(Powered by NASA SSD/CNEOS API)</h3>
            </button>
            <button
                style={buttonStyles}
                onClick={() => handleModuleChange('EPIC')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Daily imagery collected by DSCOVR's EPIC instrument
                <h3 className="text-1xl font-semibold text-white mb-2">(Powered by NASA EPIC API)</h3>
            </button>
            <button
                style={buttonStyles}
                onClick={() => handleModuleChange('IVL')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                NASA Image and Video Library
                <h3 className="text-1xl font-semibold text-white mb-2">(Powered by NASA IVL API)</h3>
            </button>
        </div>
    );
}

export default Dashboard;