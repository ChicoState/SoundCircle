import { useState } from "react";
import ReplyOverlay from "./reply-overlay";
import { PostProperties } from "./post-main";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../Redux_Store/selector";
import { CommentProperties } from "./post-comment";

function ReplyButton({ parentPostInfo, onCommentSubmit }: { parentPostInfo: PostProperties, onCommentSubmit: (newComment: CommentProperties) => void }) {
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
            className={`font-semibold ${isLoggedIn ? 'text-post_replyButton' : 'text-gray-300'}`}
            onClick={toggleOverlay}
            disabled={!isLoggedIn}
            >
                Reply
            </button>
            {/* Only create overlay when we are visible -- Optimization :) */}
            {replyVisible && (
                <ReplyOverlay
                isVisible={replyVisible}
                onOutsidePress={toggleOverlay}
                parentPostInfo={parentPostInfo}
                onCommentSubmit={onCommentSubmit}
                />
            )}
        </div>
    )
}

export default ReplyButton;