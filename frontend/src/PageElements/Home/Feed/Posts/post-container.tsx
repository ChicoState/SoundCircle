// This class is for passing information and formatting the Post and Comment(s)

import Post from "./post-main";

// This likely does NOT need to be defined again.
// Can probably just pass a Post
interface PostContainerProperties {
    userName: string;
    postContent: string;
}

function PostContainer({ userName, postContent }: PostContainerProperties) {
    return (
        <div className="post-container">
            <Post
                userName={userName}
                postContent={postContent}
            />
        </div>
    );
}

export default PostContainer;