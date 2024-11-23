import React, { useEffect, useRef, useState } from "react";
import { PostProperties } from "../Posts/post-main";

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

        try {
            // Try to send a fetch request to the backend
            // We need to specify that we want to ask for a @Post
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usernameStr: defaultUserName,  // !!!!!! HARDCODED USERNAME => Should be: " usernameStr: username || 'Default User' "
                    postDataStr: text,             // Send the text in the textarea box
                }),
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle the response data
            // Currently we do not process any response data
            const data = await response.json();

            // Clear the textarea
            setText('');

            // Send the new Post to the feed-container
            onPostSubmit(data);

        } catch (error) {
            console.error(`Error creating post: `, error);
        }
    }

    // Return the visible text box
    return (
        <div>
            <textarea
                className='resize-none overflow-auto w-[30rem] px-3 rounded-xl hover:outline-none focus:outline-none'
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Type your input here..."
            />
            {/* <button 
                className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-3 rounded shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100"
                onClick={handleSubmit}
            >
                Create Post
            </button> */}
        </div>
    );
}

export default FeedInputBox;