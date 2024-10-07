import { useState } from 'react';

interface Event {
  id: number;
  name: string;
  imageUrl: string;
}

function EventsBox() {
  // Dummy data for now  
  const dummyEvents: Event[] = [
    { id: 1, name: 'Event 1', imageUrl: 'https://via.placeholder.com/150x150.png?text=Event+1' },
    { id: 2, name: 'Event 2', imageUrl: 'https://via.placeholder.com/150x150.png?text=Event+2' },
    { id: 3, name: 'Event 3', imageUrl: 'https://via.placeholder.com/150x150.png?text=Event+3' },
    { id: 4, name: 'Event 4', imageUrl: 'https://via.placeholder.com/150x150.png?text=Event+4' },
    { id: 5, name: 'Event 5', imageUrl: 'https://via.placeholder.com/150x150.png?text=Event+5' },
    { id: 6, name: 'Event 6', imageUrl: 'https://via.placeholder.com/150x150.png?text=Event+6' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of events to display at a time
  const eventsToShow = 2;

  // Runs when next arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + eventsToShow) % dummyEvents.length);
  };

  // Runs when prev arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dummyEvents.length - eventsToShow : prevIndex - eventsToShow
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="left-0 z-10 p-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
          &#60;
        </button>

        <div className="overflow-hidden w-full">
          {/* Event Cover Display */}
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex / eventsToShow) * 100}%)` }}
          >
            {dummyEvents.map((event) => (
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