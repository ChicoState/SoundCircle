import SidebarContainer from "../Components/Sidebar/sidebar-container";
import Header from "../Components/Universal/header";
import FriendRecs from "../Components/Home/friendRecs";
import { useEffect, useState } from "react";
import { FetchUserInfo, GetLocalUserID } from "../Functions/GetLocalUserInfo";

const Home = () => {
    //////////////////////////////
    // Try to get the user ID when visiting home
    // This is no longer needed to be on home
    // This is here as an example on how to call GetLocalUserID()
    //////////////////////////////
    const { fetchUID } = GetLocalUserID()
    const [userInfo, setUserInfo] = useState<any | null>(null)

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
                const userDeets = await FetchUserInfo(user_id)
                if (userDeets) {
                    setUserInfo(userDeets)
                }
            } catch (error) {
                console.error("Error fetching user data: ", error)
            }
        }

        fetchUserData()
    }, []);
    //////////////////////////////

    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden bg-main_Background ">
            {/*Main Page Container*/}
            <div>
                {/*Header Section*/}
                <Header/>
            </div>

            <div className="flex flex-grow pt-14">
                {/*Main Body Sections*/}

                <div className="w-3/4 flex flex-grow">
                    {/*Left Column Section*/}
                    <ul className="w-full p-5 items-center text-center">
                        <FriendRecs />
                    </ul>
                </div>

                <div className="w-1/4 p-4">
                    {/*Right Column Section*/}
                    <SidebarContainer/>
                </div>
            </div>
        </div>
    );
}

export default Home;
