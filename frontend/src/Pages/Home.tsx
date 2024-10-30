import SidebarContainer from "../PageElements/Home/Sidebar/sidebar-container";
import Header from "../PageElements/Home/Universal/header";

const Home = () => {
    return (
        <div className="min-h-screen flex-col overflow-y-hidden">
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
