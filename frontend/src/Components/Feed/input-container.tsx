// User facing input for creating a post
import FeedInputBox from "./feed-input-box";
import { PostProperties } from "../Posts/post-main";

// Allow passing of local posts
interface InputContainerProps {
    onPostSubmit: (newPost: PostProperties) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({ onPostSubmit }) => {
    return (
        <FeedInputBox onPostSubmit={onPostSubmit}/>
    );
}

export default InputContainer;