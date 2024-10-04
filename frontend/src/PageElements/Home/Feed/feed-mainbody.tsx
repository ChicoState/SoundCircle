// This class grabs DB information and interprets it to create posts
// Also loosely handles the format of the feed (does not format posts and comments, just where they are relatively)
    
import { useCallback, useEffect, useRef, useState } from "react";
import PostContainer from "./Posts/post-container";

const FeedMainBody = () => {
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
             
            // Get the data from the backend
            // We don't need to specify a method, because it uses @Get by default
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts?limit=${GET_POST_LIMIT}&offset=${offset}`);

            // Check if the response is good, otherwise throw error
            if (!response.ok) {
                throw new Error(`HTTP Error: Status ${response.status}`);
            }

            // Handle HTTP response 204 ("No Content")
            if (response.status === 204)
            {
                console.log("No more posts found.");
                return;
            }
            
            // Get data or none
            let postsData = await response.json(); // Get data from json
            if (!postsData || postsData.length === 0)
            {
                throw new Error('No posts found');
            }

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
        if (!loading && !isFetching.current) {
            setOffset((prevOffset) => prevOffset + GET_POST_LIMIT);
        }
    }

    // If the length of data < GET_POST_LIMIT, disable the button
    const disableLoadMoreButton = loading || data.length % GET_POST_LIMIT !== 0;

    return (
        <div className="p-5 space-y-5 text-white overflow-y-auto overscroll-none w-full max-h-[70vh]">
            {/* Handle Loading State */}
            {loading && <p>Loading Posts...</p>}

            {/* Handle Error State */}
            {error && <p>Error loading posts: {error}</p>}

            {/* Render posts */}
            {data.length > 0 ? (
                data.map(({id, username, post_content, created_at}) => (
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
                {!loading && data.length > 0 &&
                    <button
                    className="inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-sky-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-sky-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={loadMorePosts}
                    disabled={disableLoadMoreButton}
                    >
                        Load More Posts
                    </button>
                }
            </div>
            
        </div>
    );
}

export default FeedMainBody;