import AlbumsBox from "./album-sidebar";
import ArtistsBox from "./artist-sidebar";
import GenresBox from "./genres-sidebar";
import EventsBox from "./event-sidebar";
import PeopleBox from "./people-sidebar";

const SidebarContainer = () => {
    return (
        <div>
            <div className="text-black font-semibold text-start text-lg pl-2 pb-2">
                Recommended
            </div>
             {/* <div className= "rounded-lg mb-5 pb-2"> */}
             <div className="rounded-lg mb-2 pb-2">
                <AlbumsBox />
            </div>
            <div className="rounded-lg mb-2 pb-2">
                <ArtistsBox />
            </div>
            <div className="rounded-lg mb-2 pb-2">
                <GenresBox />
            </div>
            <div className="rounded-lg mb-2 pb-2">
                <PeopleBox />
            </div>
            <div className="rounded-lg mb-2 pb-2">
                <EventsBox />
            </div>
        </div>
    )
}

export default SidebarContainer;