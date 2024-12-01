import LikeButton from "../Universal/LikeButton";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";

// This class is for populating information from post-container.tsx and formatting it
export interface CommentProperties {
    id?: number;
    user_id?: number;
    username?: string;
    comment_content?: string;
    created_at?: string;
    reactions?: number;
    profilePicURL?: string;
}

function PostComment({ username, user_id, comment_content, created_at, profilePicURL }: CommentProperties) {
    // If we have a profile pic URL, use it. Otherwise use placeholder
    const profilePic = profilePicURL ? profilePicURL : process.env.REACT_APP_PLACEHOLDER_USER;

    return (
      <div className="flex justify-center ml-[90px] py-3">
        {/* User Profile Pic */}
        <div className="flex-none w-[60px]">
            <NavigationButton_UserProfilePic
              className="w-[40px] h-[40px] rounded-full"
              username={username}
              altText={username}
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
              {username}
            </p>

            {/* Like Button */}
            <p className="absolute top-2 right-8">
              <LikeButton likeCount={0} triggered={false}/>
            </p>
          </div>

          {/* Second Line */}
          <div className="text-sm font-semibold text-post_userid">
            <p>
              @{user_id}
            </p>
          </div>

          {/* Body */}
          <div className="pt-2">
            <p>
              {comment_content}
            </p>
          </div>

          {/* Last Line */}
          <div className="absolute bottom-2 right-2">
            <button className="font-semibold text-post_replyButton">
              Reply
            </button>
          </div>
        </div>
      </div>
      );
}

export default PostComment;