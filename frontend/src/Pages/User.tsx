import "./User.css";
import Header from "../Components/Universal/header";
import UserImage from "../Components/UserPage/UserIcon";
import UserArtist from "../Components/UserPage/user-artist";
import UserGroups from "../Components/UserPage/user-groups";
import UserAlbum from "../Components/UserPage/user-album";
import { useState } from "react";

const UserPage = () => {
    const username = "WheresTheBeat16"; // or get it from state/props
    const [activeTab, setActiveTab] = useState("Taste"); // State to track active tab

    // Function to render content based on selected tab
    const renderTabContent = () => {
        switch(activeTab){
            case "Taste":
                return (
                    <div>
                        <div className="top-[-600px] pb-2 overflow-hidden relative left-[175px]">
                            <UserArtist/>
                        </div>
                        <div className="top-[-600px] pb-2 overflow-hidden relative left-[175px]">
                            <UserGroups/>
                        </div>
                        <div className="top-[-580px] pb-2 overflow-hidden relative left-[175px]">
                            <UserAlbum/>
                        </div>
                    </div>
                    );
            default:
                return <div className="tab-content"></div>; 
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Page Container */}
            <Header />
            
            {/* Navigation Bar */}
            <nav className="flex justify-start bg-gray-900 p-2 fixed top-[60px] left-[350px] z-10">
                {["Taste", "Post", "Likes","Following","Reviews","About Me"].map((tab) => (
                    <button
                        key={tab}
                        className={'text-white font-medium py-2 px-4 mx-4 ${activeTab === tab ? "border-b-2 border-white" : ""}'} //Underline Active Tab
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <div className="flex flex-grow">
                <div className="bg-gray-900 w-3/4 relative">
                    <div className="relative bg-gray-700 p-4">
                        <div className="relative top-[110px] left-[1064px] bg-gray-700 h-[690px] w-[1000px] p-4 shadow-lg z-10">
                            <UserImage username={username}/>
                        </div>
                        <div className="bg-gray-900 h-full w-full absolute inset-0"></div> 
                        <p className="UserName text-center pt-0">{username}</p>
                    </div>
                    {/* Render tab content */}
                    {renderTabContent()}
                </div>
                <div className="w-1/4 bg-white-700 flex flex-grow"></div>
            </div>
        </div>
    );
};

export default UserPage;
