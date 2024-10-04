import { useEffect, useState } from "react";
import CircularPictureWithLabel from "../../../Components/CircularPicture";

interface People {
    id: number;
    name: string;
    imageUrl: string;
}

// Dummy data to use before API is set up
const dummyPeople: People[] = [
    { id: 1, name: 'Person1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Person2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Person3', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Person4', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Person5', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Person6', imageUrl: 'https://via.placeholder.com/150' }
];

function PeopleBox() {
    // Setting people to use the dummy data
    const [people, setPeople] = useState<People[]>(dummyPeople);

    // This is the actual line to use once the API is set up
    // const [people, setPeople] = useState<People[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                setLoading(true);
                const response = await fetch("HTTP ENDPOINT");
                if (!response.ok) {
                    throw new Error('HTTP Error: Status ${response.status}');
                }
                const data = await response.json();
                setPeople(data);
            } catch (error : any) {
                setError(error.message);
                setPeople([]);
                console.log("Failure to fetch people", error);
            } finally {
                setLoading(false);
            }
        }
        // Commenting this out until API is set up
        // fetchPeople();
    });

    return (
        <div className = "People grid grid-cols-3 grid-rows-2 place-content-center gap-x-4 gap-y-2 rounded-lg px-10 pt-4">
            {people.map((people) => 
                <div key = {people.id}>
                    <CircularPictureWithLabel label = {people.name} imageUrl = {people.imageUrl} />
                </div>
            )}
        </div>
    )
}

export default PeopleBox;