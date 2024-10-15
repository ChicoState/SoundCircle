import "./Home.css";
// import { useNavigate } from "react-router-dom";
import FeedContainer from "../PageElements/Home/Feed/feed-container";
import SidebarContainer from "../PageElements/Home/Sidebar/sidebar-container";
import Header from "../PageElements/Home/Universal/header";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/*Main Page Container*/}
            <div>
            {/*<div className="bg-gray-500 flex flex-col items-center py-5">*/}
                {/*Header Section*/}
                <Header/>
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

            <div className="bg-gray-500 py-3">
                {/*Footer Section*/}
            </div>
        </div>
    );
}

export default Home;