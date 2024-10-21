import { useState } from "react";
import FeedMainBody from "./feed-mainbody";
import InputContainer from "./input-container";
import { PostProperties } from "./Posts/post-main";

const FeedContainer = () => {
    // State change for detecting when a local post is made
    // Changes inside of InputContainer
    // Pushes a new post into FeedMainBody
    const [localPost, setLocalPost] = useState<PostProperties>();

    const handleLocalPostSubmit = (newPost: PostProperties) => {
        setLocalPost(newPost);
    }

    return (
        <div className="Feed-Container">
            <InputContainer 
                onPostSubmit={handleLocalPostSubmit}
            />
            <FeedMainBody
                newLocalPost={localPost}
            />
        </div>
    );
}

export default FeedContainer;