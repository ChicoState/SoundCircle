import Cookies from "js-cookie";
import SearchBar from "../../../Components/Searchbar";
import SCLogo from "../../../Components/SoundCircle.gif";
import UserIcon from "../../../Components/UserIconTemp.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationButton from "../../../Components/Universal/NavigationButton";
import './header.css';

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const location = useLocation(); // Get current location (page)
    const isButtonActive = (path:string) => (location.pathname === path ? "bg-black bg-opacity-50 text-white font-normal" : "");  // Adjust button visuals depending on our current path

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
        console.log("user logged out");
    };

    return (
        <header className="bg-gradient-to-r from-periwinkle to-RoyalBlue grid grid-cols-3 items-center h-[60px]">
            {/* Left Logo and Buttons */}
            <div className="flex space-x-0 ml-4">
                <Link to="/"><img src={SCLogo} alt="SC Logo" style={{ width: '50px', height: '50px' }} className="mt-1 mr-4"/></Link>
                <NavigationButton buttonText="Home" navigationPath="/" className={`w-[100px] h-[60px] border-r border-l border-black border-opacity-40 ${isButtonActive("/")}`}/>
                <NavigationButton buttonText="Feed" navigationPath="/Feed" className={`w-[100px] h-[60px] border-r border-black border-opacity-40 ${isButtonActive("/Feed")}`}/>
            </div>

            {/* Center Searchbar */}
            <div className="flex justify-center">
                <SearchBar placeHolderText="Search by Artist, Album, Song, Genre, Event, Location" className="w-full"/>
            </div>

            {/* Right User/Profile */}
            <div className="flex justify-end items-center mr-4">
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
        </header>
    );
}

export default Header;
