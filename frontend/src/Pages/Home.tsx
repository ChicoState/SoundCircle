import SidebarContainer from "../Components/Sidebar/sidebar-container";
import Header from "../Components/Universal/header";
import FriendRecs from "../Components/Home/friendRecs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux_Store/actions";
import Cookies from "js-cookie";
import { selectUserID } from "../Redux_Store/selector";

const Home = () => {
    // This bit of logic is for checking if we have a user ID in our Redux store
    // Having a stored user ID will help with navigating pages
    // We might want to move this to a better place
    const dispatch = useDispatch();
    const user_id = useSelector(selectUserID);

    useEffect(() => {
        // Only check for a local UID if we are logged in
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            checkUID();
        }
    }, []);

    useEffect(() => {
        if (user_id) {
            console.log("User ID found:", user_id);
        }
    }, [user_id]);

    function checkUID() {
        // If no stored ID, get one from the backend
        if (!user_id) {
            getUID();
        } else {
            console.log(user_id);
        }
    }

    async function getUID() {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/uid`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            setUID(data.uid);
        }
    }

    function setUID(uid:number) {
        dispatch(setUser(uid));
    }

    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden">
            {/*Main Page Container*/}
            <div>
                {/*Header Section*/}
                <Header/>
            </div>

            <div className="flex flex-grow">
                {/*Main Body Sections*/}

                <div className="bg-gray-900 w-3/4 flex flex-grow">
                    {/*Left Column Section*/}
                    <ul className="w-full p-5 items-center text-center">
                        <FriendRecs />
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
