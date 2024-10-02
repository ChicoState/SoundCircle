import React, { useState } from 'react';

function SearchBar() {
  const [location, setLocation] = useState(''); // holds user-entered location
  const [results, setResults] = useState<any[] | null>(null); // holds results of api call
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on search submission
    console.log('Searching for location:', location);
    
    try {
        const response = await fetch(
            // DEMO API KEY HERE!!
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.REACT_APP_API_GEOCODING_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

        if (data.results && data.results.length > 0) {
            setResults(data.results);
            console.log("Geocoding results: ", data.results);
        }
        else {
            console.log("No results found");
            setResults(null);
            setError("No results found");
        }
    } catch (err) {
        console.error("Error fetching geocoding data", err);
        setError("Failed to fetch geocoding data");
        setResults(null);
    }
    
    setLocation(''); // Clear the input after submission
  };

  return (
    <div className="relative inline-block w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city, state, or ZIP"
          className="py-1 px-3 rounded-l-lg border border-gray-300 focus:outline-none hover:bg-gray-200 focus:bg-white transition duration-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-3 rounded-r-lg shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
