// This class grabs DB information and interprets it to create posts
// Also loosely handles the format of the feed (does not format posts and comments, just where they are relatively)

import { useEffect, useState } from "react";
import PostContainer from "./Posts/post-container";

const FeedContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const GET_POST_LIMIT = 4;

    // Attempt to fetch data from the backend
    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                setLoading(true); // Start loading, could also link this to an indicator
                const response = await fetch("HTTP ENDPOINT?limit={GET_POST_LIMIT}"); // Get the data from the backend
                if (!response.ok) {
                    throw new Error('HTTP Error: Status ${response.status}');
                }
                let postsData = await response.json(); // Get data from json
                setData(postsData); // Store our gathered posts into the 'posts' array
                setError(null);
            } catch (err : any) {
                setError(err.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDataForPosts();
    }, []);

    if (loading) {} // Do loading stuff
    if (error) {} // Show error stuff

    return (
        <div>
            {
                data.map(({id, username, content}) => (
                    <PostContainer
                        userName={username}
                        postContent={content}
                    />
                ))
            }
        </div>
    );
}

export default FeedContainer;