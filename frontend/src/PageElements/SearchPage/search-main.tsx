import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchResultsPageProps {
    searchData: string;
}

const SearchMainFeed: React.FC<SearchResultsPageProps> = ({searchData : string}) => {
    const SHOW_RESULTS_PER_LOAD = 10;
    // We use 'useLocation' because we want to read data sent to us
    const location = useLocation();
    const { searchData } = location.state || {};
    const isFetching = useRef(false);
    const [userLocation, setUserLocation] = useState(''); // holds user-entered location
    const [loading, setLoading] = useState(true); // Bool for load state
    const [results, setResults] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState<any[]>([]); // Data pulled from fetch
    const [offset, setOffset] = useState(0);

    const fetchSearchData = useCallback( async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        setError(null);

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.REACT_APP_API_GEOCODING_URL}/v1/json?q=${encodeURIComponent(userLocation)}&key=${process.env.REACT_APP_API_GEOCODING_KEY}`
            );

            // Error response
            if (!response.ok) {
                throw new Error(`HTTP Error: Status ${response.status}`);
            }
            
            // "No Content" response
            if (response.status === 204) {
                console.log("No search results found.");
                return;
            }

            // Pull data from response
            let resultData = await response.json();
            if (!resultData || resultData.length === 0) {
                throw new Error('No search results found.');
            }

            // Add new data, or append to current list
            if (offset === 0) {
                setData(resultData);
            } else {
                setData((prevData) => [...prevData, ...resultData]);
            }

            setError(null);
        } catch (err : any) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [offset]);

    // Run on page load
    useEffect(() => {
        fetchSearchData();
    }, [fetchSearchData]);

    const loadMoreResults = () => {
        if (!loading && !isFetching.current) {
            setOffset((prevOffset) => prevOffset + SHOW_RESULTS_PER_LOAD);
        }
    }

    return (
        <div className='p-5 space-y-5 text-white'>
            {/* NEED LOGIC FOR INTERPRETING RESULTS */}
            <h1>Search results for '{searchData || "____"}'</h1>
        </div>
    );
}

export default SearchMainFeed;