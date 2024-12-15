import LikeButton from "../Universal/LikeButton";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";
import { PostProperties } from "./post-main";
import ReplyButton from "./reply-button";

export interface CommentProperties {
  id: number
  user_id?: number
  username?: string  
  created_at?: string
  comment_content?: string
  reactions?: number
}

interface PostCommentProps {
  parentPost: PostProperties
  commentData: CommentProperties
  onCommentSubmit: (newComment: CommentProperties) => void
}

const PostComment: React.FC<PostCommentProps> = ({parentPost, commentData, onCommentSubmit}) => {
    // If we have a profile pic URL, use it. Otherwise use placeholder
    const profilePic = parentPost.profilePicURL ? parentPost.profilePicURL : process.env.REACT_APP_PLACEHOLDER_USER;

    return (
      <div className="flex justify-center ml-[90px] py-1">
        {/* User Profile Pic */}
        <div className="flex-none w-[60px]">
            <NavigationButton_UserProfilePic
              className="w-[40px] h-[40px] rounded-full"
              username={commentData.username}
              altText={commentData.username}
              profileImage={profilePic}
              navigationPath={`/User`}
            />
        </div>

        {/* Post */}
        <div className="relative bg-post_bgColor w-[750px] text-post_username rounded-xl text-start p-2">

          {/* First Line */}
          <div className="flex items-center">
            {/* Username */}
            <p className="flex-none text-lg font-bold">
              {commentData.username}
            </p>

            {/* Like Button */}
            <p className="absolute top-2 right-8">
              <LikeButton likeCount={0} triggered={false}/>
            </p>
          </div>

          {/* Second Line */}
          <div className="text-sm font-semibold text-post_userid">
            <p>
              @{commentData.user_id}
            </p>
          </div>

          {/* Body */}
          <div className="pt-2">
            <p>
              {commentData.comment_content}
            </p>
          </div>

          {/* Last Line */}
          <div className="absolute bottom-2 right-2">
            <ReplyButton 
            parentPostInfo={parentPost}
            onCommentSubmit={onCommentSubmit}
            commentData={commentData}
            />
          </div>
        </div>
      </div>
      );
}

export default PostComment;