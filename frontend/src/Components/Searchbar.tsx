import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchData, setSearchData] = useState('');
  const [location, setLocation] = useState(''); // holds user-entered location
  const [results, setResults] = useState<any[] | null>(null); // holds results of api call
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // show/hide suggestions dropdown
  const nextPage = useNavigate();

  // Adjust searchData to contain what is in the input box any time it is changed
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchData(value);
    setShowSuggestions(true); // Show suggestions when the user types
  }

  // Go to the next page and send our input data to be interpreted there
  const handleSearchButton = (event: React.FormEvent) => {
    event?.preventDefault();
    nextPage('/Search', { state: { searchData } });
  }

  // Define empty suggestions
  const emptySuggestions = Array.from({ length: 10 }, (_, index) => `Suggestion ${index + 1}`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on search submission
    console.log('Searching for location:', location);
    let coordinates = null;

    // Simulate a submission (the original API logic)
    try {
      // Mocking API call for geocoding
      setTimeout(() => {
        console.log('Geocoding API Mock Call');
      }, 1000);
    } catch (err) {
      console.error("Error fetching geocoding data", err);
      setError("Failed to fetch geocoding data");
      setResults(null);
    }

    // Reset location and hide suggestions after submit
    setLocation('');
    setShowSuggestions(false);
  };


  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion); // Set the clicked suggestion in the input
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const closeSuggestions = () => {
    setShowSuggestions(false); // Close the suggestions dropdown
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSearchButton} className="flex">
        <input
          type="text"
          value={location}
          onChange={(e) =>{ setLocation(e.target.value); handleInputChange(e);}}
          placeholder="Search by City, Zipcode, Artist, Album, Genre, or Username"
          className="py-1 px-3 w-full rounded-l-lg border border-gray-300 focus:outline-none hover:bg-gray-200 focus:bg-white transition duration-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-3 rounded-r-lg shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
          Search
        </button>
      </form>

      {/* Render empty suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 max-h-48 overflow-y-auto z-10">
          <ul>
            {emptySuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion} {/* Display empty suggestion */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
