import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Allows defining tailwind from outside of the class to adjust searchbar to be used most places 
interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchData, setSearchData] = useState('');
  const nextPage = useNavigate();

  // Adjust searchData to contain what is in the input box any time it is changed
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchData(value);
  }

  // Go to the next page and send our input data to be interpreted there
  const handleSearchButton = (event: React.FormEvent) => {
    event?.preventDefault();
    nextPage('/Search', { state: { searchData } });
  }

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSearchButton} className="flex">
        <input
          type="text"
          value={searchData}
          onChange={handleInputChange}
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
