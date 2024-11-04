import { useState } from "react";
import SidebarContainer from "../../PageElements/Home/Sidebar/sidebar-container";
import Header from "../../PageElements/Home/Universal/header";
import FeedContainer from "../../PageElements/Home/Feed/feed-container";
import { PostProperties } from "../../PageElements/Home/Feed/Posts/post-main";
import InputContainer from "../../PageElements/Home/Feed/input-container";

const Feed = () => {
    const [selectedTab, setSelectedTab] = useState<number | null>(0);
    const [selectedFilter, setSelectedFilter] = useState(false);
    const [localPost, setLocalPost] = useState<PostProperties>();


    const handleLocalPostSubmit = (newPost: PostProperties) => {
        setLocalPost(newPost);
    }

    const handleTabSelection = (index: number) => {
        // Prevent reloading current tab on re-selection
        if (index !== selectedTab) {
            setSelectedTab(index);
        }
    }

    const handleFilterClick = () => {
        setSelectedFilter(!selectedFilter);
    }

    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden">
            {/*Main Page Container*/}
            <div>
            {/*<div className="bg-gray-500 flex flex-col items-center py-5">*/}
                {/*Header Section*/}
                <Header/>
            </div>

            <div className="flex flex-grow">
                {/*Main Body Sections*/}

                <div className="bg-gray-900 w-3/4 flex flex-grow flex-col">
                    {/*Left Column Section*/}

                    <ul className="w-full pt-5 pb-3 items-center text-center">
                        {/* Button to toggle filter box */}
                        <button 
                        className={`transition: duration-200
                            ${selectedFilter
                            ? 'text-white font-semibold'
                            : 'text-gray-500 hover:text-gray-400 hover:font-semibold'}
                        `}
                        onClick={handleFilterClick}>
                            {selectedFilter ? 'Filters On' : 'Filters Off'}
                        </button>
                    </ul>

                    <ul className="w-full items-center text-center">
                        {/* Buttons to toggle between feeds */}
                        <button 
                        className={`h-5 px-2 mr-3 transition: duration-200
                            ${selectedTab === 0
                            ? 'font-semibold text-white'
                            : 'font-normal text-gray-500 hover:text-gray-400 hover:font-semibold'}
                        `}
                        onClick={() => {handleTabSelection(0)}}>
                            Nearby
                        </button>
                        <button 
                        className={`h-5 px-2 ml-3 transition: duration-200
                            ${selectedTab === 1
                            ? 'font-semibold text-white' 
                            : 'font-normal text-gray-500 hover:text-gray-400 hover:font-semibold'}
                        `}
                        onClick={() => {handleTabSelection(1)}}>
                            For You
                        </button>
                    </ul>

                    <ul className="pt-5 items-center text-center">
                    <InputContainer 
                        onPostSubmit={handleLocalPostSubmit}
                    />
                        {/* Logic for displaying feeds based on active button */}
                        <div className={selectedTab === 0 ? "block" : "hidden"}>
                            <FeedContainer newLocalPost={localPost} nearbyFilter={true} /> 
                        </div>
                        <div className={selectedTab === 1 ? "block" : "hidden"}>
                            <FeedContainer newLocalPost={localPost} nearbyFilter={false} /> 
                        </div>
                    </ul>
                </div>

                <div className="w-1/4 bg-gray-700 p-4">
                    {/*Right Column Section*/}
                    <SidebarContainer/>
                </div>
            </div>
        </div>
    );
}

export default Feed;
