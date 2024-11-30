import { useEffect, useState } from "react";

interface Genre {
    id: number;
    name: string;
}

function GenresBox() {
    // Dummy data for now
    const dummyGenres: Genre[] = [
        { id: 1, name: '#Rock'},
        { id: 2, name: '#Metal'},
        { id: 3, name: '#Electronic'},
        { id: 4, name: '#Hip-hop'},
        { id: 5, name: '#Alternative'},
        { id: 6, name: '#Punk'}
    ];

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
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-gray-900 rounded-lg px-2 pt-2">
                {/* Simple title */}
                <h2 className="text-white text-lg font-medium mb-2"> Genres </h2>
                <div className="Genres flex flex-wrap place-content-center  gap-x-2 gap-y-2">
                    {genres.map((genre) => (
                        <div
                            key={genre.id}
                            className="flex flex-auto items-center justify-center rounded-lg mb-2 bg-gray-700 shadow-md transition duration-300"
                        >
                            <span className="mx-1 text-gray-300">
                                {genre.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GenresBox;