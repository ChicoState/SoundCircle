import FeedMainBody, { FeedMainBodyProps } from "./feed-mainbody";

const FeedContainer: React.FC<FeedMainBodyProps> = ({ newLocalPost, nearbyFilter = false }) => {
    // State change for detecting when a local post is made
    // Changes inside of InputContainer
    // Pushes a new post into FeedMainBody


    return (
        <div>
            <FeedMainBody
                newLocalPost={newLocalPost}
                nearbyFilter={nearbyFilter}
            />
        </div>
    );
}

export default FeedContainer;