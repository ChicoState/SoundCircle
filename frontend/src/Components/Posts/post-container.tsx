// This class is for passing information and formatting the Post and Comment(s)

import Post, { PostProperties } from "./post-main";

interface PostContainerProps {
    postData: PostProperties
}

function PostContainer({ postData }: PostContainerProps) {
    return (
        <div>
            <Post {...postData} />
        </div>
    );
}

export default PostContainer;