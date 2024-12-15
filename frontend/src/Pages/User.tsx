import Header from "../Components/Universal/header";
import UserImage from "../Components/UserPage/UserIcon";
import AlbumsBox from "../Components/UserPage/UserAlbumsBox";
import ArtistsBox from "../Components/UserPage/UserArtistBox";
import { useState } from "react";
import EventsBox from "../Components/UserPage/UserEventsBox";
import UserGroupBox from "../Components/UserPage/UserGroupsBox";
import {UserFollowingPage} from "../Components/UserPage/UserFollowingPage";
import {UserFollowerPage} from "../Components/UserPage/UserFollowingPage";

const UserPage = () => {
    const username = "WheresTheBeat16"; // or get it from state/props
    const age = 22;
    const location = "Chico,Ca";
    const [activeTab, setActiveTab] = useState("Taste"); // State to track active tab
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    }
    // Function to render content based on selected tab
    const renderTabContent = () => {
        switch(activeTab){
            case "Taste":
                return (
                    <div className="grid grid-cols-1 gap-4 top-[150px] left-[550px] absolute">
                        <AlbumsBox/>
                        <ArtistsBox/>
                        <EventsBox/>
                        <UserGroupBox/>
                    </div>
                    );
            case "Following":
                return (
                    <div className="grid grid-cols-1 grap-4 top[160px] left-[550px] absolute">
                        <UserFollowingPage/>
                        <UserFollowerPage/>
                    </div>
                );
            default:
                return <div className="tab-content"></div>; 
        }
    };

    return (
        <div className="min-h-[1375px] w-[1450px] flex flex-col bg-gray-900">
            {/* Main Page Container */}
            <Header />
            
            {/* Navigation Bar */}
            <nav className=" bg-gray-900 z-5 flex justify-center top-[80px] relative">
                {["Taste", "Post", "Likes","Following","Reviews","About Me"].map((tab) => (
                    <button
                        key={tab}
                        className={`text-white font-medium py-2 px-4 mx-4 ${activeTab === tab ? "border-b-2 border-white" : ""}`} //Underline Active Tab
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
            
                <div className="bg-white-900 absolute fixed">
                    <div className="absolute bg-white">
                        {/*User Information Tab*/}
                        <div className="relative top-[100px] left-[1150px] bg-gray-700 w-[300px] p-4 shadow-lg z-10">
                            <UserImage username={username} age={age} location={location} followers={0} following={0} currentTab={activeTab} setCurrentTab={setActiveTab}/>
                            <div className="flex items-center justify-between mt-4">
                                <button 
                                    className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-600 text-white text-sm px-2 py-1 rounded shadow-md"
                                    onClick={handleFollowToggle}
                                >{isFollowing ? "Unfollow" : "Follow"} </button>
                            </div>
                        </div>
                        <div className="bg-gray-900 h-full w-full absolute inset-0"></div> 
                    </div>
                    {/* Render tab content */}
                    {renderTabContent()}
                </div>
                <div className="w-[329px] left-[-400px] bg-white-700 flex flex-grow relative"></div>
            </div>
    );
};

export default UserPage;
