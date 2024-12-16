import { useState, useEffect } from 'react';

interface Event {
  id: number;
  imageUrl: string;
  eventLocationandArtist: string;
  date: string;
  time: string;
  Location: string;
  Description: string;
}

function UserEventsBox() {
  // Dummy data for now  
  const dummyEvents: Event[] = [
    { id: 1, imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+1`, eventLocationandArtist: "Kanye West at O'Connell 254",date:"Monday, Dec 16, 2024",time:"6:00 pm",Location:"Chico, Ca", Description: "Come see Kanye West preform live in Chico at O'Connal 254, Discalimer: The real kanye west is to expensive so we hired kevin" },
    { id: 2, imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+2`, eventLocationandArtist: "Birthday party for Lil Uzi at the Crazy Horse Saloon",date: "Friday, Dec 13, 2024",time: "2:30 pm",Location: "Chico, Ca",Description: "Come wish Lil Uzi a Happy birthday at the Crazy Horse Saloon, Lil Uzi will be attending"},
    { id: 3, imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+3`, eventLocationandArtist: "1",date:"",time:"",Location:"",Description:""},
    { id: 4, imageUrl: `${process.env.REACT_APP_PLACEHOLDER_EVENT}+4`, eventLocationandArtist: "2",date:"",time:"",Location:"",Description:""},
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
    <div className="relative w-full max-w-[950px] mx-auto h-[500px] bg-gray-900 p-1" style={{marginTop:'-120px', marginLeft:"-120px"}}>
      {/* Simple title */}
      <h2 className="text-white text-lg font-medium mb-2"> Interested Events </h2>
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="left-0 z-10 p-1 text-white  hover:bg-gray-600 transition duration-100">
          &#60;
        </button>

        <div className="overflow-hidden w-[900px] h-[200px]">
          {/* Event Display */}
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ 
            transform: `translateX(-${(currentIndex / 2) * 100}%)`}}
          >
            {events.map((event) => (
              <div key={event.id} className="relative inline-block w-1/2 max-w-[50%] px-4"> {/* Changed width to 1/2 */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-start spcae-x-4 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.eventLocationandArtist}
                    className="w-[125px] h-[125px] left-[40px] object-cover"
                  />
                  <div className='flex-1 overflow-hidden'>
                    <p className="text-white font-medium text-sm break-words max-w-full">
                        {event.eventLocationandArtist}
                    </p>
                    <p className='text-gray-500 text-xs mt-1 max-w-full'>
                        {event.date} - {event.time}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 italic max-w-full">
                        Location: {event.Location}
                    </p>
                    <p className='text-gray-400 text-sm mt-2 break-words max-w-full'>
                        {event.Description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="right-0 z-10 p-1 text-white hover:bg-gray-600 transition duration-100">
          &#62;
        </button>
      </div>
    </div>
  );
}

export default UserEventsBox;