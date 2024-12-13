import { useState, useEffect} from 'react';
import oneStar from './1:5Stars.png';
import twoStar from './2:5Stars.png';
import threeStar from './3:5Stars.png';
import fourStar from './4:5Stars.png';
import fiveStar from './5:5Stars.png'
import zeroStar from './0:5Stars.png';


interface Album {
  id: number;
  name: string;
  artist: string;
  imageUrl: string;
  userScore: number;
  description: string;
}

function AlbumsBox() {
    // Dummy data for now
    const dummyAlbums: Album[] = [
      { id: 1, name: 'Album 1', artist: 'Artist 1',imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+1` ,userScore: 1, description:"Album was mid, kanye is still the goat"},
      { id: 2, name: 'Album 2', artist: 'Artist 2',imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+2` ,userScore: 2, description:"Definetly not recommended for any heavy metal fans, taylor swift has lost her way"},
      { id: 3, name: 'Album 3', artist: 'Artist 3',imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+3` ,userScore: 3, description: "BBL DRIZZY, BBLLLLL DRIZAAAAAAAA, BBL DRIZZY"},
      { id: 4, name: 'Album 4', artist: 'Artist 4',imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+4` ,userScore: 4, description: "While i was listening to this I truly felt like i needed to turn the tv off, and go to the grocery store and grab some mustard"},
      { id: 5, name: 'Album 5', artist: 'Artist 5',imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+5` ,userScore: 2, description: "Vultures 1 >  Graduation"},
      { id: 6, name: 'Album 6', artist: 'Artist 6', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ALBUM}+6`,userScore: 5, description: "Drake is mid"},
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % albums.length);
    };
  
    // Runs when prev arrow is clicked
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + albums.length) % albums.length);
    };
  
    const getRating = (rating: number) =>{
        const ratingMap : {[key:string]: string}= {
            "1": oneStar,
            "2": twoStar,
            "3": threeStar,
            "4": fourStar,
            "5": fiveStar,
            "0": zeroStar
        };
        return (
            <img 
                src={ratingMap[rating]} 
                alt={`${rating} out of 5 stars`} 
                className="inline-block relative top-[-40px] w-150 h-20"
            />
        );
    };

    //if(loading) return <p className="text-gray-300">Loading albums...</p>
    if(error) return <p className="text-red-500"> Error:{error}</p>
    return (
      <div className="relative w-[1000px] mx-auto p-2 bg-gray-900 rounded-lg overflow-hidden absolute left-[-400px]">
        {/* Simple title */}
        <h2 className="text-white text-lg font-medium mb-2"> Albums </h2>
  
        <div className="relative flex items-center">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="z-50 left-[10px] top-[85px] z-10 p-1 text-white shadow hover:bg-gray-600 transition duration-100 absolute">
            &#60;
          </button>
  
          <div className="overflow-hidden w-full">
            {/* Album Cover Display */}
            <div
              className="relative"
              style={{
                height: '240px'
              }}
            >
                {albums.map((album,index) => (
                    <div 
                        key={album.id} 
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            index === currentIndex 
                                ? 'opacity-100 z-20' 
                                : 'opacity-0 z-10'
                        }`} 
                        style={{
                            transform: 'translateX(${(index - currentIndex) * 100}%)',
                            transition: 'transform 0.5s ease',
                        }}
                    >
                        <div className="flex flex-col width-[10px] height-[10px] relative">
                            <img
                                src={album.imageUrl}
                                alt={album.name}
                                className="w-[200px] h-[200px] left-[40px] object-cover absolute"
                            />
                            <p className= "absolute top-[200px] left-[110px] text-gray-300 text-sm">{album.name}</p>
                            <p className= "absolute top-[0px] left-[300px] text-gray-300 w-[100px]">{album.artist}</p>
                            <p className= "absolute top-[0px] left-[700px] text-gray-300">{album.userScore} / 5 {getRating(album.userScore)}</p>
                            <p className= "absolute top-[50px] left-[300px] text-gray-300">{album.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
  
          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="z-50 left-[250px] top-[85px] z-10 p-1 text-white hover:bg-gray-600 transition duration-100 absolute">
            &#62;
          </button>
        </div>
      </div>
    );
  }
  
  export default AlbumsBox;