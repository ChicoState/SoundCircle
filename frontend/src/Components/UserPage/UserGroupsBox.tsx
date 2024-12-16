import { useState, useEffect } from 'react';

interface Group {
  id: number;
  name: string;
  imageUrl: string;
}

function UserGroupBox() {
  // Dummy data for now  
  const dummyGroups: Group[] = [
    { id: 1, name: 'Group 1', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+1` },
    { id: 2, name: 'Group 2', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+2` },
    { id: 3, name: 'Group 3', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+3` },
    { id: 4, name: 'Group 4', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+4` },
    { id: 5, name: 'Group 5', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+5` },
    { id: 6, name: 'Group 6', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+6` },
  ];

  // Setting artists to use the dummy data
  const [artists, setArtists] = useState<Group[]>(dummyGroups);

  // This is the actual line to use once the API is set up
  // const [artists, setArtists] = useState<Artist[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchArtists = async () => {
          try {
              setLoading(true);
              const response = await fetch("HTTP ENDPOINT");
              if (!response.ok) {
                  throw new Error('HTTP Error: Status ${response.status}');
              }
              const data = await response.json();
              setArtists(data);
          } catch (error : any) {
              setError(error.message);
              setArtists([]);
              console.log("Failure to fetch artists", error);
          } finally {
              setLoading(false);
          }
      }
      // Commenting this out until API is set up
      // fetchArtists();
  });


  // Runs when next arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % artists.length);
  };

  // Runs when prev arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artists.length - 3 : prevIndex - 3
    );
  };

  return (
    <div className="relative w-full max-w-[950px] mx-auto h-[500px] bg-gray-900 p-1" style={{marginTop: '-260px', marginLeft: '-120px'}}>
      <h2 className="text-white text-lg font-medium mb-2"> Groups </h2>
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="left-0 z-10 p-1 text-white rounded-full shadow hover:bg-gray-600 active:bg-gray-400 transition duration-100">
          &#60;
        </button>

        <div className="overflow-hidden w-full">
          {/* Artist Display */}
          <div
            className="flex transition-transform duration-500"
            style={{ 
                transform: `translateX(-${(currentIndex / 3) * 100}%)`,
                display: 'flex',
                gap: '20px',
            }}
          >
            {artists.map((artist) => (
              <div key={artist.id} className="flex flex-col items-center justify-center top-[10px] left-[10px] h-[10px]relative">                  
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-[125px] h-[125px] object-cover rounded-full left-[20px] top-[0px] relative"
                  />
                  <p className= "relative text-gray-300 text-sm left-[20px]">{artist.name}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="right-0 z-10 p-1 text-white rounded-full hover:bg-gray-600 active:bg-blue-400 transition duration-100 absolute left-[886px]">
          &#62;
        </button>
      </div>
    </div>
  );
}

export default UserGroupBox;