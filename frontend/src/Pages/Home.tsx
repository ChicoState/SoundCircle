import SidebarContainer from "../Components/Sidebar/sidebar-container";
import Header from "../Components/Universal/header";
import FriendRecs from "../Components/Home/friendRecs";

const Home = () => {
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
