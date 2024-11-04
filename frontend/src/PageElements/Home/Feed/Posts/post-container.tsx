// This class is for passing information and formatting the Post and Comment(s)

import Post, { PostProperties } from "./post-main";


function PostContainer({ username, post_content }: PostProperties) {
    return (
        <div>
            <Post
                username={username}
                post_content={post_content}
            />
        </div>
    );
}

export default PostContainer;