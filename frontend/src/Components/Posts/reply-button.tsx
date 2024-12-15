import { useState } from "react";
import ReplyOverlay from "./reply-overlay";
import { PostProperties } from "./post-main";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../Redux_Store/selector";

function ReplyButton({ parentPostInfo, newLocalComment }: { parentPostInfo: PostProperties, newLocalComment: (newPost: PostProperties) => void }) {
    // Track login status via redux store
    const isLoggedIn = useSelector(selectIsUserLoggedIn)
    // Boolean for handling reply overlay
    const [replyVisible, setReplyVisible] = useState(false)

    const toggleOverlay = () => {
        if (isLoggedIn) {
            setReplyVisible(!replyVisible)
        } else {
            setReplyVisible(false)
        }
    }

    return (
        <div>
            <button 
            className="font-semibold text-post_replyButton"
            onClick={toggleOverlay}
            >
                Reply
            </button>
            {/* Only create overlay when we are visible -- Optimization :) */}
            {replyVisible && (
                <ReplyOverlay
                isVisible={replyVisible}
                onOutsidePress={toggleOverlay}
                parentPostInfo={parentPostInfo}
                onCommentSubmit={newLocalComment}
                />
            )}
        </div>
    )
}

export default ReplyButton;