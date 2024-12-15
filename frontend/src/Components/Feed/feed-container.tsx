import FeedMainBody, { FeedMainBodyProps } from "./feed-mainbody";

const FeedContainer: React.FC<FeedMainBodyProps> = ({ newLocalPost, newLocalComment, nearbyFilter = false }) => {
    return (
        <div>
            <FeedMainBody
                newLocalPost={newLocalPost}
                newLocalComment={newLocalComment}
                nearbyFilter={nearbyFilter}
            />
        </div>
    );
}

export default FeedContainer;