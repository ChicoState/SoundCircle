import { useEffect, useState } from "react";
import CircularPictureWithLabel from "../../../Components/CircularPicture";

interface Artist {
    id: number;
    name: string;
    imageUrl: string;
}

// Dummy data to use before API is set up
const dummyArtists: Artist[] = [
    { id: 1, name: 'Artist1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Artist2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Artist3', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Artist4', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Artist5', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Artist6', imageUrl: 'https://via.placeholder.com/150' }
];

function ArtistsBox() {
    // Setting artists to use the dummy data
    const [artists, setArtists] = useState<Artist[]>(dummyArtists);

    // This is the actual line to use once the API is set up
    // const [artists, setArtists] = useState<Artist[]>([]);

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

    return (
        <div className = "Artists grid grid-cols-3 grid-rows-2 place-content-center gap-x-4 gap-y-2">
            {artists.map((artist) => 
                <div key = {artist.id}>
                    <CircularPictureWithLabel label = {artist.name} imageUrl = {artist.imageUrl} />
                </div>
            )}
        </div>
    )
}

export default ArtistsBox;