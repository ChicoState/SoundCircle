import Cookies from "js-cookie";
import SearchBar from "../Search/Searchbar";
import SCLogo from "../Images/SoundCircle.gif"
import UserIcon from "../Images/UserIconTemp.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationButton from "../Universal/NavigationButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux_Store/actions";

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const location = useLocation(); // Get current location (page)
    const isButtonActive = (path:string) => `text-header_TextColor font-semibold ${location.pathname === path ? "bg-gradient-to-b from-header_ButtonDark to-header_ButtonLight" : ""}`;  // Adjust button visuals depending on our current path
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        console.log("Access Token:", accessToken); // Debugging line to check token presence in console
        if (accessToken) {
            setIsUserLoggedIn(true);
        }else{
            setIsUserLoggedIn(false);
        }
    }, []); // Empty dependency array to run only on mount

    const handleLogout = () => {
        Cookies.remove('access_token');
        setIsUserLoggedIn(false);
        dispatch(logoutUser()); // Tell Redux to set the current uid to null
    };

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
