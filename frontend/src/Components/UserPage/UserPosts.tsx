// This class is for passing information and formatting the Post and Comment(s)

import { useCallback, useEffect, useRef, useState } from "react";
import UserIconTemp from "../Images/UserIconTemp.png";
import PeopleBox from "../Sidebar/people-sidebar";


interface PostContainerProps {
    postData: PostProperties
}
import LikeButton from "../Universal/LikeButton";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";

// This class is for populating information from post-container.tsx and formatting it
interface PostProperties {
    id: number
    user_id?: number
    comment_ids?: number[]
    reactions?: number
    username?: string
    profilePicURL?: string
    post_content?: string
    created_at?: string
}


function Post(){
    // If we have a profile pic URL, use it. Otherwise use placeholder

    const dummyPosts: PostProperties[] = [
        { id: 1, user_id: 1, comment_ids: [0,1,2,3,4,5], reactions: 0, username:"wheresthebeat16",profilePicURL: "../Images/UserIconTemp.png", post_content:"Just took a poop feeling good, I love trippie redd"},
      ];

    return (
      <div className="flex justify-center">
        {/* User Profile Pic */}
        <div className="flex-none w-[100px]">
            <NavigationButton_UserProfilePic
              className="w-[80px] h-[80px] rounded-full"
              username={"wheresthebeat16"}
              altText={"wheresthebeat16"}
              profileImage={UserIconTemp}
              navigationPath={`/User`}
            />
        </div>

        {/* Post */}
        <div className="relative bg-post_bgColor w-[800px] text-post_username rounded-xl text-start p-2">
            {dummyPosts.map((dummyPost) => (
                <div key={dummyPost.id} className="flex flex-col">
                    <div className="flex items-center">
                        <p className="flex-none text-lg font-bold">
                            {dummyPost.username}
                        </p>
                    </div>
                </div>
            ))};
        </div>
      </div>
    );
}

function PostContainer({ postData }: PostContainerProps) {
    // Store the comments we fetch
    const [data, setData] = useState<CommentProperties[]>([]);
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

            // If we haven't run this before, get the data.
            // Otherwise, append the data
            if (offset === 0) {
                setData(commentData);
            } else {
                // Prevent duplicate data
                setData(prevData => {
                    const newComments = commentData.filter(((comment: CommentProperties) => !prevData.some(existingComment => existingComment.comment_content == comment.comment_content)));
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


    return (
        <div>
            <div className="py-1">
            </div>
        </div>
    );
}

export interface CommentProperties {
    id: number
    user_id?: number
    username?: string  
    created_at?: string
    comment_content?: string
    reactions?: number
  }
  
  
export {PostContainer};