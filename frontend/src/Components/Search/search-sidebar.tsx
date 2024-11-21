import { useState } from 'react';
import FilterButton from "../../Components/Search/FilterButton";


const SearchSideBar = () => {
    // Track the selected button via a unique ID
    const [selectedButtonTypeFilter, setSelectedButtonTypeFilter] = useState<number | null>(0);
    const [selectedButtonLocationFilter, setSelectedButtonLocationFilter] = useState<number | null>(5);

    // Set the selected button to the clicked ID and null for everything else
    // For Data Type filters ONLY
    const handleButtonClickTypeFilter = (index: number) => {
        // Prevent reloading logic by checking if button already selected
        if (index !== selectedButtonTypeFilter) {
            setSelectedButtonTypeFilter(index);
        }
    }
    
    // Same logic, but for Location Buttons
    const handleButtonClickLocationFilter = (index: number) => {
        if (index !== selectedButtonLocationFilter) {
            setSelectedButtonLocationFilter(index);
        }
    }

    // Handle logic for filtering based on current index
    const filterResultsTypeFilter = (index: number) => {
        // Prevent reloading logic by checking if button already selected
        if (index !== selectedButtonTypeFilter) {
            // Need call for filtering logic
            // Likely from external ts file
            console.log("Run filter logic for: " + index);
        }
    }

    // Same logic, but for Location Buttons
    const filterResultsLocationFilter = (index: number) => {
        // Prevent reloading logic by checking if button already selected
        if (index !== selectedButtonLocationFilter) {
            // Need call for filtering logic
            // Likely from external ts file
            console.log("Run filter logic for: " + index);
        }
    }

    return(
        <div>
            <FilterButton 
            text="Everything" 
            selected={selectedButtonTypeFilter === 0} 
            onClick={() => {
                handleButtonClickTypeFilter(0);
                filterResultsTypeFilter(0);
            }}/>

            <div/>

            <FilterButton 
            text="Artists" 
            selected={selectedButtonTypeFilter === 1} 
            onClick={() => {
                handleButtonClickTypeFilter(1);
                filterResultsTypeFilter(1);
            }}/>

            <div/>

            <FilterButton 
            text="Albums" 
            selected={selectedButtonTypeFilter === 2} 
            onClick={() => {
                handleButtonClickTypeFilter(2);
                filterResultsTypeFilter(2);
            }}/>

            <div/>

            <FilterButton 
            text="Events" 
            selected={selectedButtonTypeFilter === 3} 
            onClick={() => {
                handleButtonClickTypeFilter(3);
                filterResultsTypeFilter(3);
            }}/>

            <div/>

            <FilterButton 
            text="Genres" 
            selected={selectedButtonTypeFilter === 4} 
            onClick={() => {
                handleButtonClickTypeFilter(4);
                filterResultsTypeFilter(4);
            }}/>

            <div/>

            <FilterButton 
            text="Users" 
            selected={selectedButtonTypeFilter === 5} 
            onClick={() => {
                handleButtonClickTypeFilter(5);
                filterResultsTypeFilter(5);
            }}/>

            <hr className='my-4 border-gray-500'/>

            <FilterButton 
            text="Global" 
            selected={selectedButtonLocationFilter === 5} 
            onClick={() => {
                handleButtonClickLocationFilter(5);
                filterResultsLocationFilter(5);
            }}/>

            <div/>

            <FilterButton 
            text="Nearby" 
            selected={selectedButtonLocationFilter === 6} 
            onClick={() => {
                handleButtonClickLocationFilter(6);
                filterResultsLocationFilter(6);
            }}/>

            <div/>

            <FilterButton 
            text="Specific Location" 
            selected={selectedButtonLocationFilter === 7} 
            onClick={() => {
                handleButtonClickLocationFilter(7);
                filterResultsLocationFilter(7);
            }}/>

        </div>
    );
}

export default SearchSideBar;