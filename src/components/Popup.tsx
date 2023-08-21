import React, { useState } from 'react';

const Popup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
  
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
  
      const ipinfoResponse = await fetch(`https://ipinfo.io/${ip}?token=e4c375ad007c8d`);
      const ipinfoData = await ipinfoResponse.json();
  
      const country = ipinfoData.country || 'N/A';
      const city = ipinfoData.city || 'N/A';
      setLocation(`Your country is ${country} and city is ${city}`);
    } catch (error) {
      console.error(error);
    }
  
    setIsLoading(false);
  };
  

  return (
    <div className="w-72 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Find Your Location</h1>
      <button
        className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Location'}
      </button>
      <p className={`mt-4 text-gray-600 ${isLoading ? 'hidden' : 'block'}`}>{location}</p>
    </div>
  );
};

export default Popup;
