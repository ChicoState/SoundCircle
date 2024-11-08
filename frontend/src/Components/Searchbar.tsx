import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className: string;
  placeHolderText?: string;
}

console.log('API Key:', process.env);

const SearchBar: React.FC<SearchBarProps> = ({ className, placeHolderText }) => {
  const [searchData, setSearchData] = useState('');
  const [results, setResults] = useState<any[] | null>(null); // holds results of api call
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // show/hide suggestions dropdown
  const nextPage = useNavigate();
  const searchBarRef = useRef<HTMLDivElement | null>(null); // Ref for detecting clicking outside of the search bar
  const suggestionsRef = useRef<HTMLDivElement | null>(null); // Ref for detecting clicking outside of the suggestions

  // Close the suggestions when clicking away
  useEffect(() => {
    const handleClickOutsideBox = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideBox);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideBox);
    };
  }, []);

  // Attempt to display suggestions on focus if results are available
  const handleInputFocus = () => {
    if (results && results.length > 0 && searchData.length > 2) {
      setShowSuggestions(true);
    }
  };

  // Adjust searchData to contain what is in the input box any time it is changed
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchData(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(value)}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const artistMatches = data.results.artistmatches.artist || [];
        setResults(artistMatches);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions: ', error);
        setError('Failed to fetch suggestions');
        setResults([]);
      }
    } else {
      setResults([]);
      setShowSuggestions(false);
    }
  };

  // Go to the next page and send our input data to be interpreted there
  const handleSearchButton = (searchString: string) => {
    nextPage('/Search', { state: { searchData: searchString } });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchData(suggestion);
    setShowSuggestions(false);
    handleSearchButton(suggestion);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchButton(searchData);
  };

  return (
    <div className={`${className} relative`} ref={searchBarRef}>
      <form onSubmit={handleFormSubmit} className="flex">
        <input
          type="text"
          value={searchData}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeHolderText || 'Search'}
          className="py-1 px-3 w-full rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-RoyalBlue text-white py-1 px-2 rounded-r-lg hover:bg-slateBlue transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Render suggestions dropdown */}
      {showSuggestions && results && results.length > 0 && (
        <div className="absolute top-full left-4 right-20 bg-gray-100 max-h-96 overflow-y-auto z-10" ref={suggestionsRef}>
          <ul>
            {results.map((suggestion, index) => (
              <li
                key={index}
                className="py-1 px-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                {suggestion.name} {/* Display artist suggestion */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
