// This class grabs DB information and interprets it to create posts
// Also loosely handles the format of the feed (does not format posts and comments, just where they are relatively)
    
import { useCallback, useEffect, useRef, useState } from "react";
import PostContainer from "./Posts/post-container";

const FeedContainer = () => {
    const [data, setData] = useState<any[]>([]); // Data pulled from fetch
    const [loading, setLoading] = useState(true); // Bool for load state
    const [error, setError] = useState(null); // Error state
    const [offset, setOffset] = useState(0); // Offset = which post #'s to skip when fetching
    const GET_POST_LIMIT = 3;   // Limit for fetch
    const isFetching = useRef(false); // Make sure we don't spam fetches

    // Attempt to fetch data from the backend
    const fetchDataForPosts = useCallback( async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        setError(null);
        try {
            setLoading(true); // Start loading, could also link this to an indicator
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts?limit=${GET_POST_LIMIT}&offset=${offset}`); // Get the data from the backend
            if (!response.ok) {
                throw new Error(`HTTP Error: Status ${response.status}`);
            }
            let postsData = await response.json(); // Get data from json

            // If we haven't run this before, get the data.
            // Otherwise, append the data
            if (offset === 0) {
                setData(postsData);
            } else {
                setData((prevData) => [...prevData, ...postsData]);
            }

            setError(null);
        } catch (err : any) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [offset] );

    // Attempt to fetch on page visit
    useEffect(() => {
        fetchDataForPosts();
    }, [fetchDataForPosts]);

    // Get more posts and change our offset
    const loadMorePosts = () => {
        if (!loading) {
            setOffset((prevOffset) => prevOffset + GET_POST_LIMIT);
        }
    }

    return (
        <div className="p-5 space-y-5 text-white overflow-y-auto overscroll-none w-full max-h-[70vh]">
            {/* Handle Loading State */}
            {loading && <p>Loading Posts...</p>}

            {/* Handle Error State */}
            {error && <p>Error loading posts: {error}</p>}

            {/* Render posts */}
            {data.length > 0 ? (
                data.map(({id, username, post_content}) => (
                    <PostContainer
                        key={id}
                        userName={username}
                        postContent={post_content}
                    />
                ))
            ) : (
                !loading && !error && <p>No posts available.</p>
            )}

            <div>
                {/* THIS BUTTON IS ONLY TEMPORARY */}
                <button
                className="inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-sky-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-sky-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={loadMorePosts}
                >
                    Load More Posts
                </button>
            </div>
            
        </div>
    );
}

export default FeedContainer;