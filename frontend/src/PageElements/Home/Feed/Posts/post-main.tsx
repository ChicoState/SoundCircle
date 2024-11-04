// This class is for populating information from post-container.tsx and formatting it

export interface PostProperties {
    id?: number;
    user_id?: number;
    username?: string;
    post_content?: string;
    created_at?: string;
    comments?: string;
    reactions?: number;
}

function Post({ username, post_content }: PostProperties) {
    return (
        <div className="post">
            <h1>{username}</h1>
            <h2>{post_content}</h2>
        </div>
    );
}

export default Post;