import { useEffect, useState } from "react";
import SquarePictureWithLabel from "../../../Components/SquarePicture";

interface Event {
    id: number;
    name: string;
    imageUrl: string;
}

// Dummy data to use before API is set up
const dummyEvents: Event[] = [
    { id: 1, name: 'Event1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Event2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Event3', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Event4', imageUrl: 'https://via.placeholder.com/150' },
];

function EventsBox() {
    // Setting events to use the dummy data
    const [events, setEvents] = useState<Event[]>(dummyEvents);

    // This is the actual line to use once the API is set up
    // const [events, setEvents] = useState<Event[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch("HTTP ENDPOINT");
                if (!response.ok) {
                    throw new Error('HTTP Error: Status ${response.status}');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error : any) {
                setError(error.message);
                setEvents([]);
                console.log("Failure to fetch events", error);
            } finally {
                setLoading(false);
            }
        }
        // Commenting this out until API is set up
        // fetchEvents();
    });

    return (
        <div className = "Events grid grid-cols-2 grid-rows-2 place-content-center gap-x-4 gap-y-2 rounded-lg px-10 pt-4">
            {events.map((event) => 
                <div key = {event.id}>
                    <SquarePictureWithLabel label = {event.name} imageUrl = {event.imageUrl} />
                </div>
            )}
        </div>
    )
}

export default EventsBox;