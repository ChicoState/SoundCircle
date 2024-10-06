// This class is for populating information from post-container.tsx and formatting it

export interface PostProperties {
    userName: string;
    postContent: string;
}

function Post({ userName, postContent }: PostProperties) {
    return (
        <div className="post">
            <h1>{userName}</h1>
            <h2>{postContent}</h2>
        </div>
    );
}

export default Post;