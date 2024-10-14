import React, { useState } from 'react';

// Allows defining tailwind from outside of the class to adjust searchbar to be used most places 
interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [location, setLocation] = useState(''); // holds user-entered location
  const [results, setResults] = useState<any[] | null>(null); // holds results of api call
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on search submission
    console.log('Searching for location:', location);
    let coordinates = null;
    
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_GEOCODING_URL}/v1/json?q=${encodeURIComponent(location)}&key=${process.env.REACT_APP_API_GEOCODING_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        coordinates = data.results[0].geometry; // get coordinates to send to backend
        console.log(coordinates);

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

    // Try to send coordinates to the backend
    try {
      if (coordinates) {
        const postResponse = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ coordinates }),
        });

        if (!postResponse.ok) {
          throw new Error(`Error posting coordinates to backend: ${postResponse.status}`);
        }
        console.log('Coordinates sent to backend');
      }
      else {
        throw new Error('Coordinates are undefined');
      }
    } catch (err) {
      console.error('Error posting coordinates to backend', err);
      setError('Failed to send coordinates to backend');
    }
    setLocation(''); // Clear the input after submission
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by City, Zipcode, Artist, Album, Genre, or Username"
          className="py-1 px-3 w-full rounded-l-lg border border-gray-300 focus:outline-none hover:bg-gray-200 focus:bg-white transition duration-300"
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
