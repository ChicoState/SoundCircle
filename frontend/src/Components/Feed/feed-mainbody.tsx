// This class grabs DB information and interprets it to create posts
// Also loosely handles the format of the feed (does not format posts and comments, just where they are relatively)
    
import { useCallback, useEffect, useRef, useState } from "react";
import PostContainer from "../Posts/post-container";
import { PostProperties } from "../Posts/post-main";
import { getCurrentLocation } from "../../Functions/Searching/NearbyLocation";
import Spinner from "../../Components/Universal/Spinner";

// Listen for new local posts to add at top of list
export interface FeedMainBodyProps {
    newLocalPost?: PostProperties;
    nearbyFilter?: boolean
}

const FeedMainBody: React.FC<FeedMainBodyProps> = ({ newLocalPost, nearbyFilter = false }) => {
    const [data, setData] = useState<PostProperties[]>([]); // Data pulled from fetch
    const [loading, setLoading] = useState(true); // Bool for load state
    const [error, setError] = useState<string | null>(null); // Error state
    const [offset, setOffset] = useState(0); // Offset = which post #'s to skip when fetching
    const GET_POST_LIMIT = 3;   // Limit for fetch
    const isFetching = useRef(false); // Make sure we don't spam fetches
    const [postCount, setPostCount] = useState(0); // Track the count so we can track the offset correctly
    const loadSentinalRef = useRef<HTMLDivElement | null>(null) // Detect when we reach the bottom of the page 
    const [hasPostsLeft, setHasPostsLeft] = useState(true) // Track if we still have posts available in the backend

    // Attempt to fetch data from the backend
    const fetchDataForPosts = useCallback( async () => {
        if (isFetching.current || !hasPostsLeft) return;
        
        isFetching.current = true;
        setError(null);
        setPostCount(0);
        setLoading(true); // Start loading, could also link this to an indicator

        try {
            // Get the geolocation
            let currentLocation;
            if (nearbyFilter) {
                currentLocation = await getCurrentLocation();
            }

            // Get the data from the backend
            // We don't need to specify a method, because it uses @Get by default
            // Want to send the current users location
            let apiURL = `${process.env.REACT_APP_API_BASE_URL}/posts?limit=${GET_POST_LIMIT}&offset=${offset}`

            if (nearbyFilter && currentLocation) {
                apiURL = `${process.env.REACT_APP_API_BASE_URL}/posts/location?limit=${GET_POST_LIMIT}&offset=${offset}&latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&searchDistance=${25}`
            }

            const response = await fetch(apiURL);

            // Check if the response is good, otherwise throw error
            if (!response.ok) {
                throw new Error(`HTTP Error during Post Get: Status ${response.status}`);
            }

            // Handle HTTP response 204 ("No Content")
            if (response.status === 204)
            {
                console.log("No content (posts), status:", response.status);
                return;
            }
            
            // Get data or none
            let postsData = await response.json(); // Get data from json
            if (!postsData || postsData.length === 0)
            {
                throw new Error('No posts found in response json.');
            } else {
                console.log("Found posts: ", postsData.length);
            }

            // If we haven't run this before, get the data.
            // Otherwise, append the data
            if (offset === 0) {
                setData(postsData);
            } else {
                // Prevent duplicate data
                setData(prevData => {
                    const newPosts = postsData.filter(((post: PostProperties) => !prevData.some(existingPost => existingPost.post_content == post.post_content)));
                    return [...prevData, ...newPosts]
                });
            }

            // Update our offset
            setOffset((prevOffset) => prevOffset + postsData.length)

            // If no more posts in the backend, toggle the flag
            if (postsData.length < GET_POST_LIMIT) {
                setHasPostsLeft(false)
            }
            
            setPostCount(postsData.length);
            setError(null);
        } catch (err : any) {
            setError(err.message);
            setData(data);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [offset] );


    useEffect(() => {
        fetchDataForPosts();
    }, [fetchDataForPosts]);


    // Grab the new local post and update the feed
    useEffect(() => {
        if (newLocalPost) {
            setData((prevData) => [newLocalPost, ...prevData]);
            setOffset((prevOffset) => prevOffset + 1);
        }
    }, [newLocalPost]);


    // Update the feed with more posts when we reach the bottom of the screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    fetchDataForPosts()
                }
            },
            {root: null, rootMargin: "0px", threshold: 1.0}
        )

        const sentinal = loadSentinalRef.current
        if (sentinal) {
            observer.observe(sentinal)
        }

        return () => {
            if (sentinal) {
                observer.unobserve(sentinal)
            }
        }
    }, [loading, fetchDataForPosts])



    // If the length of data < GET_POST_LIMIT, disable the button
    // const disableLoadMoreButton = loading || data.length === 0;


    return (
        <div className="p-5 space-y-5 text-black w-full">
            {/* Render posts */}
            {data.length > 0 ? (
                data.map((post, index) => (
                    <PostContainer
                        key={`${post.id} - ${index}`} postData={post}
                    />
                ))
            ) : (
                !loading && !error && <p>No posts available.</p>
            )}

            {/* <div>
                {!loading && data.length > 0 &&
                    <button
                        className='text-black rounded-3xl px-10 bg-RoyalBlue'
                        onClick={loadMorePosts}
                        disabled={disableLoadMoreButton}
                    >
                        More
                    </button>
                }
            </div> */}

            {/* Infinite loading detection */}
            <div ref = {loadSentinalRef} className='h-1'></div>
            
            {/* Handle Loading State */}
            {loading && <div className="flex justify-center"><Spinner/></div>}

            {/* Handle Error State */}
            {error && <p>Error loading posts: {error}</p>}

        </div>
    );
}

export default FeedMainBody;