import React, { useEffect, useRef, useState } from 'react';
import { selectUserID } from "../../Redux_Store/selector";
import { useSelector } from "react-redux";

interface LocationSearchProps {
  className: string;
  inputClassName: string; // Classname for styling the actual text input field
  placeHolderText?: string;

  showUpdateButton?: boolean; // Used to display/hide the update button based on where the search bar is used

  // An optional function that passes the data to the parent component (for user setup page)
  onLocationChange?: (location: {
    latitude: number;
    longitude: number;
    locationName: string;
    placeId?: string; // This is optional since it may not always be passed
  }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ className, inputClassName, placeHolderText, showUpdateButton, onLocationChange }) => {
  const [searchData, setSearchData] = useState('');
  const [results, setResults] = useState<any[] | null>(null); // holds results of api call
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // show/hide suggestions dropdown
  const LocationSearchRef = useRef<HTMLDivElement | null>(null); // Ref for detecting clicking outside of the search bar
  const suggestionsRef = useRef<HTMLDivElement | null>(null); // Ref for detecting clicking outside of the suggestions
  const locationSearchRadius = "500";        // How big of a radius in which we search for a location
  const locationSearchTypes = "locality";    // Type of location that is searched for
  const userId = useSelector(selectUserID); // Get the userId from redux store
  const [isLocationSelected, setIsLocationSelected] = useState(false); // Track if location is selected so we can enable the update button
  const [latitude, setLatitude] = useState<number | null>(0);
  const [longitude, setLongitude] = useState<number | null>(0);
  const [locationName, setlocationName] = useState<string | null>(null);

  // Close the suggestions when clicking away
  useEffect(() => {
    const handleClickOutsideBox = (event: MouseEvent) => {
      if (
        LocationSearchRef.current &&
        !LocationSearchRef.current.contains(event.target as Node) &&
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
          `${process.env.REACT_APP_API_BASE_URL}/googleApi/placesAutocomplete/?input=${encodeURIComponent(value)}&radius=${locationSearchRadius}&types=${locationSearchTypes}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const locationData = await response.json();
        setResults(locationData.predictions);
        setShowSuggestions(true);
        setIsLocationSelected(false);
      } catch (error) {
        console.error('Error fetching location suggestions: ', error);
        setError('Failed to fetch location suggestions');
        setResults([]);
      }
    } else {
      setResults([]);
      setShowSuggestions(false);
      setIsLocationSelected(false);
    }
  };

  const handleSuggestionClick = async (index: number) => {
    if (results) {
      const selectedPlaceId = results[index].place_id;
      setSearchData(results[index].description);

      // Fetch and store place details when a suggestion is clicked
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/googleApi/placeDetails/?place_id=${encodeURIComponent(selectedPlaceId)}`);
        const placeDetails = await response.json();

        setlocationName(placeDetails.locationName);
        setLatitude(placeDetails.latitude);
        setLongitude(placeDetails.longitude);
        setIsLocationSelected(true);

        // Notify the parent component
        if (onLocationChange) {
          onLocationChange({
            latitude: placeDetails.latitude,
            longitude: placeDetails.longitude,
            locationName: placeDetails.locationName,
          });
        }

        setShowSuggestions(false);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    }
  };

  // Update the user's location using already fetched data
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (latitude !== null && longitude !== null && locationName) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/newLocation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            latitude,
            longitude,
            locationName,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Clear the search bar when update completes
        setSearchData('');
        setShowSuggestions(false);

        console.log(`Successfully updated location of user number: ${userId}`);
      } catch (error) {
        console.error('Error updating location:', error);
      }
    } else {
      console.error('Location details are missing');
    }
  };

  return (
    <div className={`${className} relative`} ref={LocationSearchRef}>
      <form onSubmit={handleFormSubmit} className="flex">
        <input
          type="text"
          value={searchData}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeHolderText || 'Search'}
          // className="py-1 px-3 w-full rounded-l-lg border border-gray-300 focus:outline-none"
          className={`${inputClassName}`}
        />
        {showUpdateButton && (
          <button
            type="submit"
            disabled={!isLocationSelected} // Disable button if location not selected
            className={`py-1 px-2 rounded-r-lg transition duration-200 
              ${!isLocationSelected ? 'bg-gray-400 cursor-not-allowed' : 'bg-RoyalBlue text-white hover:bg-slateBlue'}`} // Change color of button if no location selected
          >
            Update
          </button>
        )}
      </form>

      {/* Render suggestions dropdown */}
      {showSuggestions && results && results.length > 0 && (
        <div className="absolute top-full left-4 right-20 bg-gray-100 max-h-96 overflow-y-auto z-10" ref={suggestionsRef}>
          <ul>
            {results.map((suggestion, index) => (
              <li
                key={index}
                className="py-1 px-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(index)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
