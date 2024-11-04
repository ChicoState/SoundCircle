// This class is for populating information from post-container.tsx and formatting it

import CommentBox from "../../../../Components/CommentBox";

export interface PostProperties {
    id?: number;
    user_id?: number;
    username: string;
    post_content: string;
    created_at?: string;
    comments?: string;
    reactions?: number;
}

function Post({ username, post_content }: PostProperties) {
    return (
        <div className="post">
            <CommentBox 
                userName={username} 
                postContent={post_content}            
            />
        </div>
    );
}

export default Post;