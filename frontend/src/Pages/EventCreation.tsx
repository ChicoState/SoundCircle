import { useState } from "react";
import Header from "../Components/Universal/header";
import LocationSearch from "../Components/Universal/LocationUpdateWidget";
import EventCreationButton from "../Components/Events/event-creation-button";

const EventCreation = () => {
    // Event info
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null);
    const [bands, setBands] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');

    // Placeholder for right now, will replace with backend API call
    const handleSubmit = () => {
        console.log({
            eventName,
            eventDate,
            startTime,
            endTime,
            location,
            bands,
            description,
            genre,
            ticketPrice
        });
    };

    const handleLocationSelect = (location: {
        latitude: number;
        longitude: number;
        locationName: string;
        placeId?: string;
      }) => {
        
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setLocationName(location.locationName);
      };

    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden bg-main_Background">
            <div className="pb-14">
                <Header />
            </div>
            <div className="flex justify-center py-8">
                <div className="p-8 rounded-lg shadow-md border-solid border-2 border-purple-700 w-3/4 md:w-1/2">
                    <h2 className="text-xl font-semibold mb-6">Create New Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                <input
                                    type="text"
                                    id="eventName"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Event Date</label>
                            <input
                                type="date"
                                id="eventDate"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input
                                type="time"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">End Time</label>
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <LocationSearch
                                className="mt-1"
                                inputClassName="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeHolderText=" "
                                showUpdateButton = {false}
                                onLocationChange={handleLocationSelect}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Bands</label>
                            <input
                                type="text"
                                id="bands"
                                value={bands}
                                onChange={(e) => setBands(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Genre</label>
                            <input
                                type="text"
                                id="genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Ticket Price</label>
                            <input
                                type="text"
                                id="ticketPrice"
                                value={ticketPrice}
                                onChange={(e) => setTicketPrice(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex justify-center">
                            <EventCreationButton
                                onClick={handleSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventCreation;