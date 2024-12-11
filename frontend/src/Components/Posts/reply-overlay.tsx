import Overlay from "../Reusable/overlayBox";
import NavigationButton_UserProfilePic from "../Universal/NavigationButton_UserProfilePic";
import { PostProperties } from "./post-main";

function ReplyOverlay({ isVisible, onOutsidePress, replyInformation}: {isVisible: boolean, onOutsidePress: () => void, replyInformation?: PostProperties }) {

    return (
        <Overlay 
        classNameBox='bg-white rounded-lg shadow-lg w-[30rem] h-[30rem]' 
        isVisible={isVisible} 
        onOutsidePress={onOutsidePress}
        >
            {/* Top elements */}
            <div className='w-full px-4 py-2 flex items-center justify-between space-x-8'>
                <button className='' onClick={onOutsidePress}>
                    Cancel
                </button>
                <button className=''>
                    Reply
                </button>
            </div>

            {/* User pic and message */}
            <div className='flex items-start p-w pt-4'>
                <div className='flex flex-col ml-2 mr-6'>
                    <NavigationButton_UserProfilePic
                    className="w-[4rem] h-[4rem] rounded-full"
                    username={replyInformation?.username}
                    profileImage={replyInformation?.profilePicURL}
                    navigationPath={`/User`}
                    />
                    <p className='text-center'>{replyInformation?.username}</p>
                </div>
                <div className='w-[20rem]'>
                    {replyInformation?.post_content}
                </div>
            </div>

            {/* Separation Line */}
            <hr className='mx-auto w-[28rem] h-px my-2 bg-gray-300 border-0'/>

            {/* Input area */}
            <div>

            </div>
        </Overlay>
    )
}

export default ReplyOverlay;