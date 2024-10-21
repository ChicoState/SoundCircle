import "./Home.css";
import FeedContainer from "../PageElements/Home/Feed/feed-container";
import SidebarContainer from "../PageElements/Home/Sidebar/sidebar-container";
import SearchBar from "../Components/Searchbar";
import SCLogo from "../Components/SoundCircle.gif"
import UserIcon from "../Components/UserIconTemp.png"
import { useEffect, useState } from "react";
import handleLogin from "../utils/handleLogin";
import Cookies from "js-cookie";

const Home = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = Cookies.get('access_token')
        console.log(accessToken)
        if (accessToken) {
          setIsUserLoggedIn(true);
        }
      }, [isUserLoggedIn]);
    return (
        <div className="min-h-screen flex flex-col">
            {/*Main Page Container*/}
            <div>
            {/*<div className="bg-gray-500 flex flex-col items-center py-5">*/}
                {/*Header Section*/}
                <img src={SCLogo} alt="SC Logo" style={{ width: '50px', height: '50px' }} className="absolute top-0 left-0 m-2" />
                <div className="">
                {isUserLoggedIn ? (
                <img
                    src={UserIcon}
                    alt="SC Logo"
                    style={{ width: '50px', height: '50px' }}
                    className="absolute top-0 right-0 m-2"
                />
                ) : (
                    <button className="absolute top-0 right-0 m-2 border 2px p-2"
                    >
                        <a
                    href="http://localhost:8080/login"
                  >
                    Log In
                  </a>
                    </button>



                )}
                </div>
                <div className="flex-auto place-content-center"><SearchBar/></div>
            </div>

            <div className="flex flex-grow">
                {/*Main Body Sections*/}

                <div className="bg-gray-900 w-3/4 flex flex-grow">
                    {/*Left Column Section*/}
                    <ul className="w-full p-5 items-center text-center">
                        <FeedContainer/>
                    </ul>
                </div>

                <div className="w-1/4 bg-gray-700 p-4">
                    {/*Right Column Section*/}
                    <SidebarContainer/>
                </div>
            </div>
        </div>
    );
}

export default Home;
