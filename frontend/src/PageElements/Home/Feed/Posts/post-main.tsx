// This class is for populating information from post-container.tsx and formatting it

export interface PostProperties {
    userName: string;
    postContent: string;
}
/*
function Post({ userName, postContent }: PostProperties) {
    return (
        <div className="post">
            <h1>{userName}</h1>
            <h2>{postContent}</h2>
        </div>
    );
}*/
function Post({ userName, postContent }: PostProperties) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-1/2 bg-blue-500 p-6 text-white border border-blue-300 rounded mb-4"> {/* Adjusted here */}
                {/* User info box with space for an icon */}
                <div className="absolute top-2 left-2 bg-blue-700 text-white p-2 rounded flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full"></div>
                    <h1 className="text-lg font-bold">{userName}</h1>
                </div>
                
                <div className="mt-14 text-2xl break-words overflow-hidden pb-12">
                    {postContent}
                </div>
                
                <button className="absolute bottom-2 right-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    Reply
                </button>
            </div>
        </div>
    );
}

export default Post;