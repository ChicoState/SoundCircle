import {selectUserName } from "../Redux_Store/selector";
import Header from "../Components/Universal/header";
import UserImage from "../Components/UserPage/UserIcon";
import AlbumsBox from "../Components/UserPage/UserAlbumsBox";
import ArtistsBox from "../Components/UserPage/UserArtistBox";
import {lazy, useEffect, useState } from "react";
import EventsBox from "../Components/UserPage/UserEventsBox";
import UserGroupBox from "../Components/UserPage/UserGroupsBox";
import {UserFollowingPage,UserFollowerPage} from "../Components/UserPage/UserFollowingPage";
import { logoutUser, setUser, setUsername } from "../Redux_Store/actions";
import { FetchUserInfo, GetLocalUserID } from "../Functions/GetLocalUserInfo"
import { useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';



const UserPage = () => {
    const {username} = useParams<{username: string}>();
    const { fetchUID } = GetLocalUserID()
    const dispatch = useDispatch()
    const age = 22;
    const [activeTab, setActiveTab] = useState("Taste"); // State to track active tab
    const [isFollowing, setIsFollowing] = useState(false);
    const [location,setLocation] = useState<string>("");
    const [true_username,setTrueUsername] = useState<string>("");
    const [friends, setFriends] = useState<any[]>([]);

    const fetchUserData = async () => {
        try {
            // Step 1: Get the user id
            const user_id = await fetchUID()
            if (!user_id) {
                console.warn("No User ID found.")
                return
            }

            // Step 2: Fetch user information using the ID
            const user = await FetchUserInfo(user_id)
            // Set our local redux info
            if (user && user.user) {
                setLocation(user.user.locationName);
                setTrueUsername(user.user.username);
                setFriends(user.user.friends);
                dispatch(setUser(user.user.id))
                dispatch(setUsername(user.user.username))
                // dispatch(setUserImage(user.image))
            }
        } catch (error) {
            console.error("Error fetching user data: ", error)
        }
    }

    useEffect(() =>{
        fetchUserData();
    },[]);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    }
    // Function to render content based on selected tab'
    const renderTabContent = () => {
        switch(activeTab){
            case "Taste":
                return (
                    <div className="  ">
                        <AlbumsBox/>
                        <ArtistsBox/>
                        <EventsBox/>
                        <UserGroupBox/>
                    </div>
                    );
            case "Following":
                return (
                    <div className="grid grid-cols-1">
                        <UserFollowingPage/>
                        <UserFollowerPage/>
                    </div>
                );
            default:
                return <div className="text-white">Select a tab to view content</div>; 
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            {/* Main Page Container */}
            <Header />
            
            {/* Navigation Bar */}
            <nav className=" bg-gray-900 z-5 flex justify-center pt-20">
                {["Taste", "Post", "Likes","Following","Reviews"].map((tab) => (
                    <button
                        key={tab}
                        className={`text-white font-medium py-2 px-4 mx-4 ${activeTab === tab ? "border-b-2 border-white" : ""}`} //Underline Active Tab
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
            
                <div className="relative flex flex-row lg-flex-row justify-between py-8">
                    <div className="absolute top-19 right-0 bg-gray-700 w-72 p-4 shadow-lg z-10">
                        {/*User Information Tab*/}
                            <UserImage
                                username={username || true_username} 
                                age={age} 
                                location={location} 
                                followers={0} 
                                following={0} 
                                currentTab={activeTab} 
                                friends={friends}
                                setCurrentTab={setActiveTab}
                            />
                            <div className="flex items-center justify-between mt-4">
                                <button 
                                    className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-600 text-white text-sm px-2 py-1 rounded shadow-md"
                                    onClick={handleFollowToggle}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"} 
                                </button>
                            </div>
                    </div>
                    {/* Render tab content */}
                    <div className="flex-1 pt-20 px-8">
                        <div className="max-w-screen-lg mx-auto px-6">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default UserPage;
