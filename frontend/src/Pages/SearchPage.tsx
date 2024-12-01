import { useLocation } from 'react-router-dom';
import Header from "../Components/Universal/header";
import SearchMainFeed from "../Components/Search/search-main";
import SearchSideBar from "../Components/Search/search-sidebar";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);  // Extract search params from URL
  const searchData = searchParams.get('query') || "";  // Get 'query' from the URL, or fallback to empty string

  return (
    <div className='min-h-screen flex flex-col bg-gray-900'>
      <div>
        <Header />
      </div>

      <div className="flex flex-grow">
        {/* Main Body Sections */}
        <div className="w-3/4 flex flex-grow">
          {/* Left Column Section */}
          <ul className="w-full p-5 items-center text-center">
            {/* Pass the searchData prop to SearchMainFeed */}
            <SearchMainFeed searchData={searchData} />
          </ul>
        </div>

        {/* Right Column Section */}
        <div className="w-1/4 bg-gray-700 p-4">
          <SearchSideBar />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
