import { useState } from "react";
import SidebarContainer from "../Components/Sidebar/sidebar-container";
import Header from "../Components/Universal/header";
import FeedContainer from "../Components/Feed/feed-container";
import { PostProperties } from "../Components/Posts/post-main";
import InputContainer from "../Components/Feed/input-container";

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
        <div className="min-h-screen flex flex-col overflow-y-hidden bg-main_Background ">
            <div>
                {/*Header Section*/}
                <Header/>
            </div>

            <div className="flex flex-grow pt-14">
                {/*Main Body Sections*/}

                <div className="w-3/4 flex flex-col">
                    {/*Left Column Section*/}
                    <ul className="w-full pt-5 pb-3 items-center text-center">
                        {/* Button to toggle filter box */}
                        {/* <button 
                        className={`transition: duration-200
                            ${selectedFilter
                            ? 'text-black font-semibold'
                            : 'text-gray-500 hover:text-gray-400 hover:font-semibold'}
                        `}
                        onClick={handleFilterClick}>
                            {selectedFilter ? 'Filters On' : 'Filters Off'}
                        </button> */}
                    </ul>

                    {/* Input and Feed Display */}
                    <ul className="pt-5 flex justify-center">
                        {/* <InputContainer onPostSubmit={handleLocalPostSubmit}/> */}
                    </ul>

                    {/* Feed Type Buttons */}
                    <ul className="pt-10 text-center">
                        <button 
                        className={`h-5 px-8 transition-all duration-200 relative
                            ${selectedTab === 0
                            ? 'font-semibold text-black after:block after:w-6 after:h-1 after:bg-black after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:rounded-full' 
                            : 'font-normal text-gray-500 hover:text-gray-400 hover:font-semibold'}
                        `}
                        onClick={() => {handleTabSelection(0)}}>
                            Following
                        </button>

                        <button 
                        className={`h-5 px-8 transition-all duration-200 relative
                            ${selectedTab === 1
                            ? 'font-semibold text-black after:block after:w-6 after:h-1 after:bg-black after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:rounded-full'
                            : 'font-normal text-gray-500 hover:text-gray-400 hover:font-semibold'}
                        `}
                        onClick={() => {handleTabSelection(1)}}>
                            Nearby
                        </button>
                    </ul>

                    <ul className="pt-5 text-center flex-grow">
                        {/* Logic for displaying feeds based on active button */}
                        <div className={selectedTab === 0 ? "block" : "hidden"}>
                            <FeedContainer newLocalPost={localPost} nearbyFilter={false} /> 
                        </div>
                        <div className={selectedTab === 1 ? "block" : "hidden"}>
                            <FeedContainer newLocalPost={localPost} nearbyFilter={true} /> 
                        </div>
                    </ul>
                </div>

                <div className="w-1/4 p-4">
                    {/*Right Column Section*/}
                    <SidebarContainer/>
                </div>
            </div>
        </div>
    );
}

export default Feed;
