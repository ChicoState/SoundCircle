import React, {useEffect, useState} from 'react'

interface User {
    id: number,
    username: string,
}

const FriendRecs: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const USERS_LIMIT = 8;

    // Using a placeholder image until we get profile pics working
    const placeholder_url = "https://via.placeholder.com/150x150.png?text=Person"

    // Hardcoding userEmail for right now
    const userEmail = 'thundercat@test.com';
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/friendRecommendations?userEmail=${userEmail}&limit=${USERS_LIMIT}`);

                if (!response.ok) {
                    throw new Error('Network error getting friend recommendations');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div><p className='text-gray-300'>Loading...</p></div>;
    }

    if (error ) {
        return <div><p className='text-red-500'>Error...</p></div>;
    }

    return (
        // <div className="w-full p-4 bg-gradient-to-r from-periwinkle to-gray-900 overflow-x-auto rounded-lg">
        <div className="w-full p-4 bg-gradient-to-r from-periwinkle to-RoyalBlue overflow-x-auto rounded-lg">
            <h2 className="text-lg text-left text-gray-900 font-semibold mb-4">Potential Friends</h2>
            <div className="flex place-content-center overflow-x-auto space-x-8 bg-gray-900 rounded-lg py-4">
                {users.map(user => (
                    <div key={user.id} className="flex flex-col items-center">
                        <img
                            src={placeholder_url}
                            alt={`${user.username}'s profile`}
                            className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <p className="text-sm text-gray-300 font-medium">{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FriendRecs;