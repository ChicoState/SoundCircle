import React, { useEffect, useRef, useState } from "react";

const FeedInputBox = () => {
    const [text, setText] = useState('');   // Handles storing text to pass
    const maxCharacters = 256;              // Max characters allowed
    const textAreaRef = useRef<HTMLTextAreaElement>(null);       // Directly modify this item instead of using states

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
                    usernameStr: "SCDev User", // !!!!!! HARDCODED USERNAME => Should be: " usernameStr: username || 'Default User' "
                    postDataStr: text
                }),
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle the response data
            const data = await response.json();
            console.log("Post created successfully: ", data);

            // Clear the textarea
            setText('');

        } catch (error) {
            console.error("Error creating post: ", error);
        }
    }

    // Return the visible text box
    return (
        <div className="relative inline-block">
            <textarea
                className="resize-none overflow-auto w-[30rem] h-[1rem] p-2 pb-10 rounded-lg hover:bg-gray-200 focus:bg-white transition duration-300"
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                placeholder="Type your input here..."
            />
            <button 
                className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-3 rounded shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100"
                onClick={handleSubmit}
            >
                Create Post
            </button>
        </div>
    );
}

export default FeedInputBox;