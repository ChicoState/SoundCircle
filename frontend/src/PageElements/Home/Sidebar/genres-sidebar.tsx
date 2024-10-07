import { useEffect, useState } from "react";

interface Genre {
    id: number;
    name: string;
}

// Dummy data to use before API is set up
const dummyGenres: Genre[] = [
    { id: 1, name: 'Rock'},
    { id: 2, name: 'Metal'},
    { id: 3, name: 'Electronic'},
    { id: 4, name: 'Hip-hop'},
    { id: 5, name: 'Alternative'},
    { id: 6, name: 'Punk'}
];

function GenresBox() {
    const [genres, setGenres] = useState<Genre[]>(dummyGenres);

    return (
        <div className="Genres flex flex-wrap place-content-center bg-gray-900 gap-x-2 gap-y-2 rounded-lg px-10 pt-4">
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
    );
}

export default GenresBox;