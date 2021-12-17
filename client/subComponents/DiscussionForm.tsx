import Comment from "./Comment"
import { useState } from "react";
import { FaUserAlt, FaThumbsUp, FaThumbsDown, FaCaretDown, FaCaretUp, FaReply } from "react-icons/fa"
import ReplyComment from "./ReplyComment";
import Title from "./Title";


const DiscussionForm = ({ comments, post }: any) => {

    const initialState = {
        commentsLength: comments.length - 1,
        viewIndex: 2
    }

    const [comment, setComment] = useState(initialState);

    const { commentsLength, viewIndex } = comment;

    const viewMoreComments = () => {
        const newState = {
            commentsLength: commentsLength,
            viewIndex: viewIndex + 2
        }
        setComment(newState);

    }

    const collapseComments = () => {
        const newState = {
            commentsLength: commentsLength,
            viewIndex: 1
        }
        setComment(newState);
    }

    const updateViewIndex = (index: number) => {
        const newState = {
            commentsLength: commentsLength,
            viewIndex: index
        }
        setComment(newState);
    }

    return (
        <div className="discussion">
            <Title title={`${comments.length} Comments`} />
            {comments.map((comment: any, index: number) => {
                if (index > viewIndex)
                    return;
                (index: number) => updateViewIndex(index);
                return (
                    <Comment id={comment.id} comment={comment} replies={comment.replies} />
                )
            })}
            <div className="discussion-actions">
                {commentsLength >= 1 && viewIndex < commentsLength && <small className="discussion-actions-small" onClick={() => viewMoreComments()}>view more Comments<FaCaretDown /></small>}
                {viewIndex > 2 && <small className="discussion-actions-small" onClick={() => collapseComments()}>collapse Comments<FaCaretUp /></small>}
            </div>
            <ReplyComment PARENT={0}  POST={post.id} placeholder="Add a comment"/>
        </div>
    )
}

export default DiscussionForm
