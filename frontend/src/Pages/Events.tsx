import SidebarContainer from "../Components/Sidebar/sidebar-container";
import Header from "../Components/Universal/header";
import EventCreationButton from "../Components/Events/event-creation-button";
import { useNavigate } from "react-router-dom";

const Events = () => {
    const navigate = useNavigate();

    const goToEventCreation = () => {
        navigate('/EventCreation')
    }

    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden bg-main_Background">
            <div>
                <Header/>
            </div>
            <div className="flex flex-grow pt-14">
                {/*Main Body Sections*/}

                <div className="w-3/4 flex flex-grow">
                    {/*Left Column Section*/}
                    <ul className="w-full p-5 items-center text-center">
                        <EventCreationButton 
                            onClick={goToEventCreation}
                        />
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

export default Events;