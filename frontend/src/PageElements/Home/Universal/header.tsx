import Cookies from "js-cookie";
import SearchBar from "../../../Components/Searchbar";
import SCLogo from "../../../Components/SoundCircle.gif";
import UserIcon from "../../../Components/UserIconTemp.png";
import { useEffect, useState } from "react";

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);
        if (accessToken) {
            setIsUserLoggedIn(true);
        }
    }, [isUserLoggedIn]);

    return (
        <header className="bg-gradient-to-r from-periwinkle to-RoyalBlue flex items-center justify-between py-5 px-4">
            {/* Left Logo */}
            <div className="flex items-center">
                <img src={SCLogo} alt="SC Logo" style={{ width: '50px', height: '50px' }} />
            </div>

            {/* Center Searchbar */}
            <div className="flex-grow flex justify-center">
                <SearchBar className="w-full max-w-3xl" />
            </div>

            {/* Right User/Profile */}
            <div className="flex items-center">
                {isUserLoggedIn ? (
                    <img src={UserIcon} alt="User Icon" style={{ width: '50px', height: '50px' }} className="m-2" />
                ) : (
                    <button className="m-2 border-2 p-2">
                        <a href="http://localhost:8080/login">Log In</a>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
