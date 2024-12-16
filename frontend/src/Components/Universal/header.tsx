import Cookies from "js-cookie";
import SearchBar from "../Search/Searchbar";
import SCLogo from "../Images/SoundCircle.gif"
import UserIcon from "../Images/UserIconTemp.png";
import { useEffect, useState } from "react";
import { Link, useAsyncError, useLocation } from "react-router-dom";
import NavigationButton from "../Universal/NavigationButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser, setUserImage, setUsername } from "../../Redux_Store/actions";
import { FetchUserInfo, GetLocalUserID } from "../../Functions/GetLocalUserInfo"
import { selectUserID, selectUserName } from "../../Redux_Store/selector";

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const location = useLocation(); // Get current location (page)
    const isButtonActive = (path:string) => `text-header_TextColor font-semibold ${location.pathname === path ? "bg-gradient-to-b from-header_ButtonDark to-header_ButtonLight" : ""}`;  // Adjust button visuals depending on our current path
    
    const { fetchUID } = GetLocalUserID()
    const dispatch = useDispatch()
    const user_id = useSelector(selectUserID)
    const username = useSelector(selectUserName)

    // Logout on user press
    const handleLogout = () => {
        Cookies.remove('access_token');
        setIsUserLoggedIn(false);
        dispatch(logoutUser()); // Tell Redux to set the current uid to null
    };

    // Check and fetch local user info w/ redux store
    useEffect(() => {
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
                    dispatch(setUser(user.user.id))
                    dispatch(setUsername(user.user.username))
                    // dispatch(setUserImage(user.image))
                }
            } catch (error) {
                console.error("Error fetching user data: ", error)
            }
        }

        // Check if we currently have info
        if (!user_id || !username) {
            // If we dont, try to get it
            fetchUserData()
        } else {
            setIsUserLoggedIn(true)
            console.log("Already have ID, no need to check :)")
        }
    }, [user_id, username, dispatch]);


    return (
        <header className="fixed top-0 right-0 left-0 z-50 bg-gradient-to-t from-header_Dark to-header_Light grid grid-cols-3 items-center h-[60px]">
            {/* Left Logo and Buttons */}
            <div className="flex space-x-0 pl-20">
                <Link to="/">
                    <img src={SCLogo}
                        alt="SC Logo"
                        style={{ width: '50px', height: '50px' }}
                        className="mt-1 mr-4"
                    />
                </Link>
                <NavigationButton 
                    buttonText="Home" 
                    navigationPath="/" 
                    className={`w-[100px] h-[60px] ${isButtonActive("/")}`}
                />
                <NavigationButton 
                    buttonText="Feed" 
                    navigationPath="/Feed" 
                    className={`w-[100px] h-[60px] ${isButtonActive("/Feed")}`}
                />
                <NavigationButton 
                    buttonText="Events" 
                    navigationPath="/Events" 
                    className={`w-[100px] h-[60px] ${isButtonActive("/Events")}`}
                />
            </div>

            {/* Center Searchbar */}
            <div className="flex justify-center">
                <SearchBar 
                    placeHolderText="Search" 
                    className="w-full relative"
                />
            </div>

            {/* Right User/Profile */}
            <div className="flex justify-end items-center pr-20">
                {isUserLoggedIn ? (
                    <div className="flex items-center">
                        <button onClick={handleLogout} className="flex m-2 px-4 py-1 bg-white rounded-full">
                            Log Out
                        </button>
                        {location.pathname !== "/user" && (
                            <Link to="/user">
                                <img src={UserIcon} alt="User Icon" style={{ width: '50px', height: '50px' }} 
                                    className=""
                                />
                            </Link>
                        )}
                    </div>
                ) : (
                    <button className="m-2 px-4 py-1 bg-white rounded-full">
                        <Link to='http://localhost:8080/login'><a style={{ width: '50px', height: '50px' } }>Log In</a></Link>
                    </button>
                )}
            </div>

            {/* Gradient Overlay */}
            <div 
                className="absolute bottom-[-12px] left-0 w-full h-3 bg-gradient-to-b from-header_Shadow to-transparent"
            />
        </header>
    );
}

export default Header;
