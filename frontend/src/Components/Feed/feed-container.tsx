import FeedMainBody, { FeedMainBodyProps } from "./feed-mainbody";

const FeedContainer: React.FC<FeedMainBodyProps> = ({ newLocalPost, nearbyFilter = false }) => {
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