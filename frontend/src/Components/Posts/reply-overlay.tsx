// TO-DO: USER LINKS

import { useEffect, useRef, useState } from "react";
import Overlay from "../Reusable/overlayBox";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";
import { PostProperties } from "./post-main";
import { MAX_COMMENT_CHARACTERS } from "../../globals";

function ReplyOverlay({ isVisible, onOutsidePress, replyInformation}: {isVisible: boolean, onOutsidePress: () => void, replyInformation?: PostProperties }) {
    // Info for user input
    const placeholder = "Enter your reply..."
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);


    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        if (value.length <= MAX_COMMENT_CHARACTERS) {
            setText(value)
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
                <button className='' onClick={onOutsidePress}>
                    Cancel
                </button>
                <button className='text-gray-400'>
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
                    username="Default User"
                    profileImage={process.env.REACT_APP_PLACEHOLDER_USER}
                    navigationPath={`/User`}
                    />
                    <p className='text-sm'>Default User</p>
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