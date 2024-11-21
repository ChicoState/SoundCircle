import { useState, useEffect } from 'react';

interface Event {
  id: number;
  name: string;
  imageUrl: string;
}

function EventsBox() {
  // Dummy data for now  
  const dummyEvents: Event[] = [
    { id: 1, name: 'Event 1', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+1` },
    { id: 2, name: 'Event 2', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+2` },
    { id: 3, name: 'Event 3', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+3` },
    { id: 4, name: 'Event 4', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+4` },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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


  // Runs when next arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % events.length);
  };

  // Runs when prev arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 2 : prevIndex - 2
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-2 bg-gray-900 rounded-lg shadow-md overflow-hidden">
      {/* Simple title */}
      <h2 className="text-white text-lg font-medium mb-2"> Events </h2>
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="left-0 z-10 p-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
          &#60;
        </button>

        <div className="overflow-hidden w-full">
          {/* Event Display */}
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
          >
            {events.map((event) => (
              <div key={event.id} className="inline-block w-1/2 px-2"> {/* Changed width to 1/2 */}
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <p className="mt-1 text-gray-300 text-sm">{event.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="right-0 z-10 p-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
          &#62;
        </button>
      </div>
    </div>
  );
}

export default EventsBox;