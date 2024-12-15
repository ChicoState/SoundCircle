// TO-DO: USER LINKS

import { useEffect, useRef, useState } from "react";
import Overlay from "../Reusable/overlayBox";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";
import { PostProperties } from "./post-main";
import { MAX_COMMENT_CHARACTERS } from "../../globals";
import { useSelector } from "react-redux";
import { selectUserImage, selectUserName } from "../../Redux_Store/selector";
import { FetchUserInfo, GetLocalUserID } from "../../Functions/GetLocalUserInfo"
import { User } from "../../../../backend/Types/users";

function ReplyOverlay(
        {isVisible, onOutsidePress, replyInformation, onCommentSubmit}: 
        {isVisible: boolean, onOutsidePress: () => void, replyInformation?: PostProperties, onCommentSubmit: (newPost: PostProperties) => void}
    ) {
    // Info for user input
    const placeholder = "Enter your reply..."
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    // Reply button handling
    const [canReply, setCanReply] = useState(false)

    // Local redux info
    const localUsername = useSelector(selectUserName)
    const localUserimage = useSelector(selectUserImage)

    // Post submission logic
    const { fetchUID } = GetLocalUserID()
    const [userInfo, setUserInfo] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        if (value.length <= MAX_COMMENT_CHARACTERS) {
            setText(value)
        }
        if (value.length > 0) {
            setCanReply(true)
        } else {
            setCanReply(false)
        }
    }

        // Attempt to send data to the database
        const handleSubmit = async () => {
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
                onCommentSubmit(data);
    
            } catch (error) {
                console.error(`Error creating post:`, error);
            }
        }

    // Update the size of the text box as we add more text
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [text])


    return (
        <Overlay 
        classNameBox='bg-white rounded-lg shadow-lg w-[30rem]' 
        isVisible={isVisible} 
        onOutsidePress={onOutsidePress}
        >
            {/* Top elements */}
            <div className='w-full px-4 py-2 flex items-center justify-between space-x-8'>
                <button className='text-main_Accent_DarkPurple' onClick={onOutsidePress}>
                    Cancel
                </button>
                <button 
                className={`transition-all duration-300 ${canReply
                    ? 'text-white bg-main_Accent_DarkPurple px-2 py-0.5 rounded-full cursor-pointer'
                    : 'text-white bg-main_Accent_LightPurple px-2 py-0.5 rounded-full cursor-default' }`}
                >
                    Reply
                </button>
            </div>

            {/* User pic and message */}
            <div className='flex items-start p-w pt-4'>
                <div className='flex flex-col ml-2 mr-6'>
                    <NavigationButton_UserProfilePic
                    className="w-[4rem] h-[4rem] rounded-full"
                    username={replyInformation?.username}
                    profileImage={replyInformation?.profilePicURL}
                    navigationPath={`/User`}
                    />
                    <p className='text-center'>{replyInformation?.username}</p>
                </div>
                <div className='w-[23rem]'>
                    {replyInformation?.post_content}
                </div>
            </div>

            {/* Separation Line */}
            <div className='pt-4'>
                <hr className='mx-auto w-[28rem] h-px my-2 bg-gray-300 border-0'/>
                <text className='ml-2 text-xs italic'>
                    Replying to {replyInformation?.username}
                </text>
            </div>
            

            {/* Input area */}
            <div className='flex items-start p-w pt-4 pb-2'>
                <div className='flex flex-col ml-2 mr-6'>
                    <NavigationButton_UserProfilePic
                    className="w-[4rem] h-[4rem] rounded-full"
                    username={localUsername}
                    profileImage={localUserimage || process.env.REACT_APP_PLACEHOLDER_USER}
                    navigationPath={`/User`}
                    />
                    <p className='text-sm'>{localUsername}</p>
                </div>
                <textarea
                className='w-[23rem] resize-none overflow-y-auto hover:outline-none focus:outline-none'
                ref={textAreaRef}
                value={text}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                rows={4}
                />
            </div>
        </Overlay>
    )
}

export default ReplyOverlay;