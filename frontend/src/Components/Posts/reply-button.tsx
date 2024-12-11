import { useState } from "react";
import ReplyOverlay from "./reply-overlay";
import { PostProperties } from "./post-main";

function ReplyButton({ replyInformation }: { replyInformation: PostProperties }) {
    // Boolean for handling reply overlay
    const [replyVisible, setReplyVisible] = useState(false)
    const toggleOverlay = () => setReplyVisible(!replyVisible)

    return (
        <div>
            <button 
            className="font-semibold text-post_replyButton"
            onClick={toggleOverlay}
            >
                Reply
            </button>
            <ReplyOverlay
                isVisible={replyVisible}
                onOutsidePress={toggleOverlay}
                replyInformation={replyInformation}
            />
        </div>
    )
}

export default ReplyButton;