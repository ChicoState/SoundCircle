// This class is for passing information and formatting the Post and Comment(s)

import { useCallback, useEffect, useRef, useState } from "react";
import PostComment from "./post-comment";
import Post, { PostProperties } from "./post-main";

interface PostContainerProps {
    postData: PostProperties
    newLocalComment?: PostProperties
}

function PostContainer({ postData, newLocalComment }: PostContainerProps) {
    // Store the comments we fetch
    const [data, setData] = useState<PostProperties[]>([]);
    const [loading, setLoading] = useState(true); // Bool for load state
    const [error, setError] = useState<string | null>(null); // Error state
    const [offset, setOffset] = useState(0); // Offset = which post #'s to skip when fetching
    const GET_COMMENT_LIMIT = 2;   // Limit for fetch
    const isFetching = useRef(false); // Make sure we don't spam fetches
    const [commentCount, setCommentCount] = useState(0);    // Track the count so we can track the offset correctly
    // If there is no more data on the last fetch, disable the button to fetch more comments
    const disableLoadMoreButton = loading || commentCount < GET_COMMENT_LIMIT;

    // Fetch comments based on given id's
    const fetchComments = useCallback( async () => {
        if (postData.comment_ids?.length === undefined || postData.comment_ids?.length <= 0) return;
        if (isFetching.current) return;
        
        isFetching.current = true;
        setError(null)
        setLoading(true)

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/comments?limit=${GET_COMMENT_LIMIT}&offset=${offset}&comment_ids=${postData.comment_ids?.join(',')}`)
        
            if (!response.ok) {
                throw new Error(`HTTP Error during Comment Get: Status ${response.status}`);
            }

            // Handle HTTP response 204 ("No Content")
            if (response.status === 204)
            {
                console.log("No content (comments), status:", response.status);
                return;
            }

            // Get data or none
            let commentData = await response.json(); // Get data from json
            if (!commentData || commentData.length === 0)
            {
                setCommentCount(0)
                throw new Error('No posts found in response json.');
            } else {
                console.log("Found comments: ", commentData.length);
            }
                        
            // Rename comment_content to post_content
            if (commentData && commentData.length > 0) {
                commentData = commentData.map((comment: any) => ({
                    ...comment,
                    post_content: comment.comment_content,
                }))
            }

            // If we haven't run this before, get the data.
            // Otherwise, append the data
            if (offset === 0) {
                setData(commentData);
            } else {
                // Prevent duplicate data
                setData(prevData => {
                    const newComments = commentData.filter(((comment: PostProperties) => !prevData.some(existingComment => existingComment.post_content == comment.post_content)));
                    return [...prevData, ...newComments]
                });
            }

            setCommentCount(commentData.length)
            setError(null)
        } catch (err : any) {
            setError(err.message)
            setData(data)
        } finally {
            setLoading(false)
            isFetching.current = false
        }
    }, [offset] );

    // Attempt to fetch more comments on button press by setting the offset higher
    const loadMoreComments = async () => {
        if (!loading && !isFetching.current && commentCount >= GET_COMMENT_LIMIT) {
            setOffset((prevOffset) => prevOffset + GET_COMMENT_LIMIT); // Increase offset by the limit
        }
    }
    
    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // Grab the new local comment and update the feed
    useEffect(() => {
        if (newLocalComment) {
            setData((prevData) => [newLocalComment, ...prevData]);
            setOffset((prevOffset) => prevOffset + 1);
        }
    }, [newLocalComment]);

    return (
        <div>
            <Post {...postData} />
            {/* Comments */}
            <div>
                {data.length > 0 ?(
                    data.map(({id, user_id, username, post_content}, index) => (
                        <PostComment
                            key={`${id} - ${index}`}
                            user_id = {user_id}
                            username = {username}
                            post_content = {post_content}
                        />
                    ))
                ) : (
                    !loading && !error
                )}
            </div>
            <div>
                <button
                    className=""
                    onClick={loadMoreComments}
                    hidden ={disableLoadMoreButton}
                >
                    Show More Comments
                </button>
            </div>
        </div>
    );
}

export default PostContainer;