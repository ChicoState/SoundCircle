import LikeButton from "../Universal/LikeButton";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";
import { CommentProperties } from "./post-comment";
import ReplyButton from "./reply-button";

// This class is for populating information from post-container.tsx and formatting it
export interface PostProperties {
    id: number
    user_id?: number
    comment_ids?: number[]
    reactions?: number
    username?: string
    profilePicURL?: string
    post_content?: string
    created_at?: string
}

interface PostProps {
  parentPost: PostProperties
  onCommentSubmit: (newComment: CommentProperties) => void
}

const Post: React.FC<PostProps> = ({parentPost, onCommentSubmit}) => {
    // If we have a profile pic URL, use it. Otherwise use placeholder
    const profilePic = parentPost.profilePicURL ? parentPost.profilePicURL : process.env.REACT_APP_PLACEHOLDER_USER;

    return (
      <div className="flex justify-center">
        {/* User Profile Pic */}
        <div className="flex-none w-[100px]">
            <NavigationButton_UserProfilePic
              className="w-[80px] h-[80px] rounded-full"
              username={parentPost.username}
              altText={parentPost.username}
              profileImage={profilePic}
              navigationPath={`/User`}
            />
        </div>

        {/* Post */}
        <div className="relative bg-post_bgColor w-[800px] text-post_username rounded-xl text-start p-2">

          {/* First Line */}
          <div className="flex items-center">
            {/* Username */}
            <p className="flex-none text-lg font-bold">
              {parentPost.username}
            </p>

            {/* Like Button */}
            <p className="absolute top-2 right-8">
              <LikeButton likeCount={0} triggered={false}/>
            </p>
          </div>

          {/* Second Line */}
          <div className="text-sm font-semibold text-post_userid">
            <p>
              @{parentPost.user_id}
            </p>
          </div>

          {/* Body */}
          <div className="pt-2 text-black">
            <p>
              {parentPost.post_content}
            </p>
          </div>

          {/* Last Line */}
          <div className="absolute bottom-2 right-2">
            <ReplyButton 
              parentPostInfo={parentPost}
              onCommentSubmit={onCommentSubmit}
            />
          </div>
        </div>
      </div>
      );
}

export default Post;