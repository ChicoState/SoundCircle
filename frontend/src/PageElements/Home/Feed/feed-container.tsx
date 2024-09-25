import { useEffect, useState } from "react";
import PostContainer from "./Posts/post-container";

const FeedContainer = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Attempt to fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading, could also link this to an indicator
                const response = await axios.get('/api/backend-endpoint'); // Get the data from the backend
                setPosts(response.data);
            } catch (err) {
                setError("Failed to fetch post data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {} // Do loading stuff
    if (error) {} // Show error stuff

    return (
        <div className="feed-container">
            {posts.map(post => (
                <PostContainer
                    userName={post.user}
                    postContents={post.contents}
                />
            ))}
        </div>
    );
}

export default FeedContainer;