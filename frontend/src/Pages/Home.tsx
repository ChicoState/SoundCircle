import "./Home.css";
// import { useNavigate } from "react-router-dom";
import FeedContainer from "../PageElements/Home/Feed/feed-container";
import InputContainer from "../PageElements/Home/Feed/input-container";
import PeopleBox from "../PageElements/Home/Sidebar/people-sidebar";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/*Main Page Container*/}
            <div className="bg-gray-500 py-5">
                {/*Header Section*/}
            </div>

            <div className="flex flex-grow">
                {/*Main Body Sections*/}

                <div className="bg-gray-900 w-3/4 flex flex-grow">
                    {/*Left Column Section*/}
                    <ul className="w-full p-5 items-center text-center">
                        <InputContainer/>
                        <FeedContainer/>
                    </ul>
                </div>

                <div className="w-1/4 bg-gray-700 p-4">
                    {/*Right Column Section*/}
                    <PeopleBox/>
                </div>
            </div>

            <div className="bg-gray-500 py-3">
                {/*Footer Section*/}
            </div>
        </div>
    );
}

export default Home;