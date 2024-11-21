import { useState, useEffect} from 'react';

interface Album {
  id: number;
  name: string;
  imageUrl: string;
}

function AlbumsBox() {
  // Dummy data for now
  const dummyAlbums: Album[] = [
    { id: 1, name: 'Album 1', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+1` },
    { id: 2, name: 'Album 2', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+2` },
    { id: 3, name: 'Album 3', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+3` },
    { id: 4, name: 'Album 4', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+4` },
    { id: 5, name: 'Album 5', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+5` },
    { id: 6, name: 'Album 6', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+6` },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Setting albums to use the dummy data
  const [albums, setAlbums] = useState<Album[]>(dummyAlbums);

  // This is the actual line to use once the API is set up
  // const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchAlbums = async () => {
          try {
              setLoading(true);
              const response = await fetch("HTTP ENDPOINT");
              if (!response.ok) {
                  throw new Error('HTTP Error: Status ${response.status}');
              }
              const data = await response.json();
              setAlbums(data);
          } catch (error : any) {
              setError(error.message);
              setAlbums([]);
              console.log("Failure to fetch albums", error);
          } finally {
              setLoading(false);
          }
      }
      // Commenting this out until API is set up
      // fetchAlbums();
  });


  // Runs when next arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % albums.length);
  };

  // Runs when prev arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? albums.length - 3 : prevIndex - 3
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-2 bg-gray-900 rounded-lg shadow-md overflow-hidden">
      {/* Simple title */}
      <h2 className="text-white text-lg font-medium mb-2"> Albums </h2>

      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="left-0 z-10 p-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
          &#60;
        </button>

        <div className="overflow-hidden w-full">
          {/* Album Cover Display */}
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}
          >
            {albums.map((album) => (
              <div key={album.id} className="inline-block w-1/3 px-2">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={album.imageUrl}
                    alt={album.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <p className= "mt-1 text-gray-300 text-sm">{album.name}</p>
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

export default AlbumsBox;
