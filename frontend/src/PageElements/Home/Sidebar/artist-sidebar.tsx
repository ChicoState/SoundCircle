import { useState } from 'react';

interface Artist {
  id: number;
  name: string;
  imageUrl: string;
}

function ArtistsBox() {
  // Dummy data for now  
  const dummyArtists: Artist[] = [
    { id: 1, name: 'Artist 1', imageUrl: 'https://via.placeholder.com/150x150.png?text=Artist+1' },
    { id: 2, name: 'Artist 2', imageUrl: 'https://via.placeholder.com/150x150.png?text=Artist+2' },
    { id: 3, name: 'Artist 3', imageUrl: 'https://via.placeholder.com/150x150.png?text=Artist+3' },
    { id: 4, name: 'Artist 4', imageUrl: 'https://via.placeholder.com/150x150.png?text=Artist+4' },
    { id: 5, name: 'Artist 5', imageUrl: 'https://via.placeholder.com/150x150.png?text=Artist+5' },
    { id: 6, name: 'Artist 6', imageUrl: 'https://via.placeholder.com/150x150.png?text=Artist+6' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Runs when next arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % dummyArtists.length);
  };

  // Runs when prev arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dummyArtists.length - 3 : prevIndex - 3
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
          {/* Artist Display */}
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}
          >
            {dummyArtists.map((artist) => (
              <div key={artist.id} className="inline-block w-1/3 px-2">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <p className= "mt-1 text-gray-300 text-sm">{artist.name}</p>
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

export default ArtistsBox;