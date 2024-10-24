import Cookies from "js-cookie";
import SearchBar from "../../../Components/Searchbar";
import SCLogo from "../../../Components/SoundCircle.gif";
import UserIcon from "../../../Components/UserIconTemp.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);
        if (accessToken) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [isUserLoggedIn]);

    return (
        <header className="bg-gradient-to-r from-periwinkle to-RoyalBlue flex items-center h-[60px] px-2">
            {/* Left Logo */}
            <div>
                <Link to="/"><img src={SCLogo} alt="SC Logo" style={{ width: '50px', height: '50px' }}/></Link>
            </div>

            {/* Center Searchbar */}
            <div className="flex-grow flex justify-center">
                <SearchBar className="w-full max-w-2xl" />
            </div>

            {/* Right User/Profile */}
            <div>
                {isUserLoggedIn ? (
                    <Link to="/user"><img src={UserIcon} alt="SC Logo" style={{ width: '50px', height: '50px' }} /></Link>
                ) : (
                    <button className='rounded-3xl w-[80px] text-center bg-white p-2 font-semibold'>
                        <a href="http://localhost:8080/login">Log In</a>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
