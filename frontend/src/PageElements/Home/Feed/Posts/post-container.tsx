

interface PostContainerProperties {
    userName: string;
    postContents: string;
}

function PostContainer({ userName, postContents }: PostContainerProperties) {
    return (
        <div className="post-container">
            <h1>{userName}</h1>
            <p>{postContents}</p>
        </div>
    );
}

export default PostContainer;