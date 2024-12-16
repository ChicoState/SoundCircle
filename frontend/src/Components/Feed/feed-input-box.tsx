import React, { useEffect, useRef, useState } from "react";
import { PostProperties } from "../Posts/post-main";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";
import { FetchUserInfo, GetLocalUserID } from "../../Functions/GetLocalUserInfo"
import { User } from "../../../../backend/Types/users"
import { MdSend } from "react-icons/md";

// Allow listening of newly created posts
interface FeedInputBoxProps {
    onPostSubmit: (newPost: PostProperties) => void;
}

const FeedInputBox: React.FC<FeedInputBoxProps> = ( { onPostSubmit } ) => {
    const [text, setText] = useState('');   // Handles storing text to pass
    const maxCharacters = 256;              // Max characters allowed
    const textAreaRef = useRef<HTMLTextAreaElement>(null);       // Directly modify this item instead of using states
    const defaultUserName = "SCDev";
    const [isFocused, setIsFocused] = useState(false);

    const { fetchUID } = GetLocalUserID()
    const [userInfo, setUserInfo] = useState<{user: User | null; location:string | null}>({user:null,location:null})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Step 1: Get the user id
                const user_id = await fetchUID()
                if (!user_id) {
                    console.warn("No User ID found.")
                    return
                }

                // Step 2: Fetch user information using the ID
                const userDeets = await FetchUserInfo(user_id)
                if (userDeets) {
                    setUserInfo(userDeets)
                }
            } catch (error) {
                console.error("Error fetching user data: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, []);




    // Change the contents of "text"
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        // Only update value of text if the new value's length fits in our maxChar's
        if (value.length <= maxCharacters) {
            setText(value);
        }
    }

    // Auto-expand the textarea height based on content
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [text]);

    // Attempt to send data to the database
    const handleSubmit = async () => {
        if (!text.trim()) return; // Prevents submitting empty posts

        console.log("Sending user as post owner:", userInfo)
        console.log("Sending post data:", {
            userObj: userInfo,
            postDataStr: text,
        })

        try {
            // Try to send a fetch request to the backend
            // We need to specify that we want to ask for a @Post
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/newPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userObj: userInfo,
                    postDataStr: text,
                }),
            })            

            if (!response.ok)
            {
                throw new Error(`HTTP error when creating new post: ${response.status}`);
            }

            // Handle the response data
            // Currently we do not process any response data
            const data = await response.json();

            // Clear the textarea
            setText('');

            // Send the new Post to the feed-container
            onPostSubmit(data);

        } catch (error) {
            console.error(`Error creating post:`, error);
        }
    }

    // Return the visible text box
    return (
        <div className="flex items-center space-x-3">
            {
                !isLoading && userInfo != null ? (
                    <>
                        <NavigationButton_UserProfilePic
                            className="w-12 h-12 rounded-full"
                        />
                        <textarea
                            className='resize-none overflow-auto w-[30rem] px-3 rounded-xl hover:outline-none focus:outline-none'
                            ref={textAreaRef}
                            value={text}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Type your input here..."
                        />
                        <button 
                            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                                ${text.length <= 0 
                                ? 'border-2 border-main_Accent_LightGray text-main_Accent_DarkGray' 
                                : 'border-2 border-transparent bg-main_Accent_DarkPurple text-white'}`}
                            onClick={handleSubmit}
                        >
                            <MdSend className="w-6 h-6"/>
                        </button>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default FeedInputBox;