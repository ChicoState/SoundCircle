// This class is for populating information from post-container.tsx and formatting it

import CommentBox from "../../../../Components/CommentBox";// Adjust the path as necessary

export interface PostProperties {
    userName: string;
    postContent: string;
}

function Post({ userName, postContent }: PostProperties) {
    return (
        <div className="post">
            {/* Render CommentBox */}
            <CommentBox 
                userName={userName} 
                postContent={postContent} 
            />
        </div>
    );
}

export default Post;
