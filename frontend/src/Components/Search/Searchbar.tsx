import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
  className: string;
  placeHolderText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, placeHolderText }) => {
  const [searchData, setSearchData] = useState('');
  const [results, setResults] = useState<any[] | null>(null);
  const [selectedMbid, setSelectedMbid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const nextPage = useNavigate();
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  // Close suggestions when clicking away
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
    return () => document.removeEventListener('mousedown', handleClickOutsideBox);
  }, []);

  // Handle input changes and fetch suggestions
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchData(value);
    setSelectedMbid(null); // Reset selected mbid when input changes

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

  // Handle suggestion click and navigate
  const handleSuggestionClick = (suggestion: { name: string; mbid: string }) => {
    setSearchData(suggestion.name);
    setSelectedMbid(suggestion.mbid || null); // Save mbid from suggestion
    setShowSuggestions(false);
    handleSearchButton(suggestion.name, suggestion.mbid);
  };

  // Navigate to the search results page with query parameter
  const handleSearchButton = (searchString: string, mbid: string | null) => {
    nextPage(`/Search?query=${encodeURIComponent(searchString)}`);
  };

  // Handle form submission (fallback when no suggestion is selected)
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchButton(searchData, selectedMbid); // Use selectedMbid or fallback
  };

  return (
    <div className={`${className}`} ref={searchBarRef}>
      <form onSubmit={handleFormSubmit}>
        <input
          className="py-1 px-3 pr-10 w-full rounded-full focus:outline-none bg-searchbar_Background hover:bg-searchbar_HoverBackground placeholder:text-searchbar_PlaceholderText"
          type="text"
          value={searchData}
          onChange={handleInputChange}
          placeholder={placeHolderText || 'Search'}
        />
        <button
          type="submit"
          className="absolute right-3 top-1 text-searchbar_IconColor"
        >
          <MdSearch className='w-6 h-6'/>
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
                onClick={() => handleSuggestionClick({ name: suggestion.name, mbid: suggestion.mbid })}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
