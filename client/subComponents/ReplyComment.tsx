
import { FaPaperPlane } from "react-icons/fa";

const ReplyComment = () => {
    return (
        <form className="reply">
            <textarea className="reply-box" placeholder="Comment" />
            <button id="sss" className="reply-postComment" type='button'>
                <span className="reply-postComment-button">
                    <FaPaperPlane />
                </span>
            </button>
        </form>
    )
}

export default ReplyComment
