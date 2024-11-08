// This class is for populating information from post-container.tsx and formatting it
export interface PostProperties {
    id?: number;
    user_id?: number;
    username?: string;
    post_content?: string;
    created_at?: string;
    comments?: string;
    reactions?: number;
    profilePicURL?: string;
}

function Post({ username, post_content, created_at, profilePicURL }: PostProperties) {
    // If we have a profile pic URL, use it. Otherwise use placeholder
    const profilePic = profilePicURL ? profilePicURL : "https://via.placeholder.com/150x150.png?text=Person"

    return (
        <div className="flex justify-center mx-auto">
          {/* Properties for the post box */}
          <div className="
                relative 
                w-full 
                max-w-3xl 
                bg-gradient-to-br 
                from-gray-200
                to-periwinkle
                sm:p-3 
                text-black
                rounded-xl
            ">
    
            {/* Profile Section */}
            <div className="flex items-center mb-4"> 
              {/* Profile picture */}
              <button className="flex items-center p-2 transition-transform transform hover:scale-105"> {/* Isolated Transform */}
                <img
                  alt=""
                  src={profilePic}
                  className="w-8 h-8 rounded-full object-cover border border-black"
                />
                <h1 className="text-lg font-bold ml-2">{username}</h1>
              </button>
            </div>
    
            {/* Post Content */}
            <div className="flex-1 ml-4 mt-2">
              <div className="text-start text-xl break-words overflow-hidden max-w-full px-2">
                {post_content}
              </div>
    
              {/* Footer Section */}
              <footer className="flex justify-between items-center mt-4">
                {/* Posted Date */}
                <span className="text-xs">
                  {created_at ? `${new Date(created_at).toLocaleDateString()}` : null}
                </span>
    
                {/* Reply Button */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
                  Reply
                </button>
              </footer>
            </div>
          </div>
        </div>
      );
}

export default Post;