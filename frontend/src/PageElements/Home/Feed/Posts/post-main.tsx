// This class is for populating information from post-container.tsx and formatting it

interface PostProperties {
    userName: string;
    postContent: string;
}

function Post({ userName, postContent }: PostProperties) {
    return (
        <div className="post">
            <h1>{userName}</h1>
            <p>{postContent}</p>
        </div>
    );
}

export default Post;