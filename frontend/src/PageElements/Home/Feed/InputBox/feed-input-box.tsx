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

    // Return the visible text box
    return (
        <div className="relative inline-block w-1/4">
            <textarea
                className="resize-none overflow-auto min-h-[50px] w-full p-3 pb-12 rounded-lg hover:bg-gray-200 focus:bg-white transition duration-300"
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                rows={2}
                placeholder="Type your input here..."
            />
            <button 
                className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-3 rounded shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100"
                onClick={() => {}}
            >
                Submit
            </button>
        </div>
    );
}

export default FeedInputBox;