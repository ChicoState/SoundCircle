import Header from "../Components/Universal/header";
import UserImage from "../Components/UserPage/UserIcon";
import AlbumsBox from "../Components/UserPage/UserAlbumsBox";
import ArtistsBox from "../Components/UserPage/UserArtistBox";
import { useState } from "react";

const UserPage = () => {
    const username = "WheresTheBeat16"; // or get it from state/props
    const [activeTab, setActiveTab] = useState("Taste"); // State to track active tab

    // Function to render content based on selected tab
    const renderTabContent = () => {
        switch(activeTab){
            case "Taste":
                return (
                    <div className="grid grid-cols-1 gap-4 top-[175px] left-[450px] absolute">
                        <AlbumsBox/>
                        <ArtistsBox/>
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
            <nav className="flex justify-start h-[100px] bg-gray-900 p-4 fixed top-[60px] left-[350px] z-10">
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

            <div className="flex flex-grow">
                <div className="bg-gray-900 w-[1400px] relative">
                    <div className="relative bg-gray-700 p-4 ">
                        <div className="relative top-[110px] left-[1150px] bg-gray-700 h-[690px] w-[300px] p-4 shadow-lg z-10">
                            <UserImage username={username}/>
                        </div>
                        <div className="bg-gray-900 h-full w-full absolute inset-0"></div> 
                        <p className="UserName text-center pt-0">{username}</p>
                    </div>
                    {/* Render tab content */}
                    {renderTabContent()}
                </div>
                <div className="w-[329px] left-[-400px] bg-white-700 flex flex-grow relative"></div>
            </div>
        </div>
    );
};

export default UserPage;
