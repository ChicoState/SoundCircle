import { useState, useEffect } from 'react';

interface Person {
  id: number;
  name: string;
  imageUrl: string;
}

function UserFollowingPage() {
  // Dummy data for now  
  const dummyPeople: Person[] = [
    { id: 1, name: 'Person 1', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+1` },
    { id: 2, name: 'Person 2', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+2` },
    { id: 3, name: 'Person 3', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+3` },
    { id: 4, name: 'Person 4', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+4` },
    { id: 5, name: 'Person 5', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+5` },
    { id: 6, name: 'Person 6', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+6` },
  ];

  // Setting people to use the dummy data
  // const [people, setPeople] = useState<Person[]>(dummyPeople);

  // This is the actual line to use once the API is set up
  const [people, setPeople] = useState<Person[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
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


  // Runs when next arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % people.length);
  };

  // Runs when prev arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? people.length - 3 : prevIndex - 3
    );
  };

  return (
    <div className="relative w-[400px] left-[-300px] p-2 bg-gray-900 shadow-md overflow-hidden top-[150px]">
      {/* Simple title */}
      <h2 className="text-white text-lg font-medium mb-2"> Following </h2>
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="left-0 z-10 p-1 text-white rounded-full hover:bg-gray-600 transition duration-100">
          &#60;
        </button>

        <div className="overflow-hidden w-full">
          {/* Person Display */}
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}
          >
            {people.map((person) => (
              <div key={person.id} className=" w-1/3 px-2 relative left-[45px]">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={person.imageUrl}
                    alt={person.name}
                    className="w-[400px] h-[100px] object-cover rounded-full"
                  />
                  <p className= "mt-1 text-gray-300 text-sm">{person.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="relative left-[-150px] z-10 p-1 text-white shadow hover:bg-gray-600 transition duration-100">
          &#62;
        </button>
      </div>
    </div>
  );
}

function UserFollowerPage() {
    // Dummy data for now  
    const dummyPeople: Person[] = [
      { id: 1, name: 'Person 1', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+1` },
      { id: 2, name: 'Person 2', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+2` },
      { id: 3, name: 'Person 3', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+3` },
      { id: 4, name: 'Person 4', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+4` },
      { id: 5, name: 'Person 5', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+5` },
      { id: 6, name: 'Person 6', imageUrl: `${process.env.REACT_APP_PLACEHOLDER_USER}+6` },
    ];
  
    // Setting people to use the dummy data
    const [people, setPeople] = useState<Person[]>(dummyPeople);
  
    // This is the actual line to use once the API is set up
    // const [people, setPeople] = useState<Person[]>([]);
  
    const [currentIndex, setCurrentIndex] = useState(0);
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
  
  
    // Runs when next arrow is clicked
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % people.length);
    };
  
    // Runs when prev arrow is clicked
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? people.length - 3 : prevIndex - 3
      );
    };
  
    return (
      <div className="relative w-[400px] left-[140px] p-2 bg-gray-900 rounded-lg shadow-md overflow-hidden top-[-647px]">
        {/* Simple title */}
        <h2 className="text-white text-lg font-medium mb-2"> Followers </h2>
        <div className="relative flex items-center">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="left-0 z-10 p-1 text-white shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100">
            &#60;
          </button>
  
          <div className="overflow-hidden w-full relative left-[20px]">
            {/* Person Display */}
            <div
              className="whitespace-nowrap transition-transform duration-500"
              style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}
            >
              {people.map((person) => (
                <div key={person.id} className=" w-1/3 px-2">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <p className= "mt-1 text-gray-300 text-sm">{person.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="relative left-[-170px] p-1 text-white shadow hover:bg-gray-600 transition duration-100">
            &#62;
          </button>
        </div>
      </div>
    );
  }
  
  export {UserFollowerPage, UserFollowingPage};