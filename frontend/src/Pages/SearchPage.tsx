import { useLocation } from 'react-router-dom';
import Header from '../PageElements/Home/Universal/header';
import SearchMainFeed from '../PageElements/SearchPage/search-main';
import SearchSideBar from '../PageElements/SearchPage/search-sidebar';

const SearchResultsPage = () => {
    const location = useLocation();
    const { searchData } = location.state || {};

    return (
        <div className='min-h-screen flex flex-col bg-gray-900'>
            <div>
                <Header/>
            </div>

            <div className="flex flex-grow">
                {/*Main Body Sections*/}
                <div className="w-3/4 flex flex-grow">
                    {/*Left Column Section*/}
                    <ul className="w-full p-5 items-center text-center">
                    <SearchMainFeed searchData={searchData}/>
                    </ul>
                </div>

                <div className="w-1/4 bg-gray-700 p-4">
                    {/*Right Column Section*/}
                    <SearchSideBar/>
                </div>
            </div>
        </div>
    );
}

export default SearchResultsPage;