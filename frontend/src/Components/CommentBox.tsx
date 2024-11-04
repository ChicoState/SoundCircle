import userIcon from './UserIconTemp.png';

interface CommentBoxProps {
  userName: string;
  postContent: string;
}


function CommentBox({ userName, postContent }: CommentBoxProps) {
  return (
    <div className="flex justify-center mx-auto">
      {/* Properties for the post box */}
      <div className="
            relative 
            w-full 
            max-w-3xl 
            bg-gradient-to-br 
            from-blue-600 
            to-red-200 
            p-5 
            sm:p-7 
            text-white 
            border 
            border-blue-300 
            rounded-xl 
            mb-6 
            shadow-lg 
            transition-transform 
            transform 
            hover:scale-105 
        ">

        {/* Profile Section */}
        <div className="flex items-center mb-4"> 
          {/* Profile picture */}
          <div className="flex items-center p-2 border border-white rounded-md transition-transform transform hover:scale-110"> {/* Isolated Transform */}
            <img
              alt={userName}
              src={userIcon}
              className="w-8 h-8 rounded-full shadow-lg object-cover border border-black"
            />
            <h1 className="text-lg font-bold ml-2">{userName}</h1>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex-1 ml-4 mt-2">
          <div className="text-xl break-words overflow-hidden max-w-full ">
            {postContent}
          </div>

          {/* Footer Section */}
          <footer className="flex justify-between items-center mt-4">
            {/* Posted Date */}
            <span className="text-sm">
              Posted on: {new Date().toLocaleDateString()}
            </span>

            {/* Reply Button */}
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
              Reply
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;