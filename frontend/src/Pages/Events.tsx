import SidebarContainer from "../Components/Sidebar/sidebar-container";
import Header from "../Components/Universal/header";
import EventCreationButton from "../Components/Events/event-creation-button";

const Events = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden bg-main_Background">
            <div className="pb-6">
                <Header/>
            </div>
            <div className="flex justify-center pt-16">
                <EventCreationButton/>
            </div>
        </div>
    );
}

export default Events;