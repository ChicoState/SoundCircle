import { useEffect, useState } from "react";
import CircularPictureWithLabel from "../../../Components/CircularPicture";

interface Genre {
    id: number;
    name: string;
    imageUrl: string;
}

// Dummy data to use before API is set up
const dummyGenres: Genre[] = [
    { id: 1, name: 'Genre1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Genre2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Genre3', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Genre4', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Genre5', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Genre6', imageUrl: 'https://via.placeholder.com/150' }
];

function GenresBox() {
    // Setting genres to use the dummy data
    const [genres, setGenres] = useState<Genre[]>(dummyGenres);

    // This is the actual line to use once the API is set up
    // const [genres, setGenres] = useState<Genre[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const response = await fetch("HTTP ENDPOINT");
                if (!response.ok) {
                    throw new Error('HTTP Error: Status ${response.status}');
                }
                const data = await response.json();
                setGenres(data);
            } catch (error : any) {
                setError(error.message);
                setGenres([]);
                console.log("Failure to fetch genres", error);
            } finally {
                setLoading(false);
            }
        }
        // Commenting this out until API is set up
        // fetchGenres();
    });

    return (
        <div className = "Genres grid grid-cols-3 grid-rows-2 place-content-center gap-x-4 gap-y-2 rounded-lg px-10 pt-4">
            {genres.map((genre) => 
                <div key = {genre.id}>
                    <CircularPictureWithLabel label = {genre.name} imageUrl = {genre.imageUrl} />
                </div>
            )}
        </div>
    )
}

export default GenresBox;