import ArtistsBox from "./artist-sidebar";
import GenresBox from "./genres-sidebar";
import EventsBox from "./event-sidebar";
import PeopleBox from "./people-sidebar";

const SidebarContainer = () => {
    return (
        <div className="Sidebar-Container">
            <div className="bg-slateBlue rounded-lg mb-5 pb-2">
                <ArtistsBox />
            </div>
            <div className="bg-slateBlue rounded-lg mb-5 pb-2">
                <GenresBox />
            </div>
            <div className="bg-slateBlue rounded-lg mb-5 pb-2">
                <EventsBox />
            </div>
            <div className="bg-slateBlue rounded-lg mb-5 pb-2">
                <PeopleBox />
            </div>
        </div>
    )
}

export default SidebarContainer;