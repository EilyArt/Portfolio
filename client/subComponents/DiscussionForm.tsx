import Comment from "./Comment"
import { useState } from "react";
import { FaUserAlt, FaThumbsUp, FaThumbsDown, FaCaretDown, FaCaretUp, FaReply } from "react-icons/fa"
import ReplyComment from "./ReplyComment";
import Title from "./Title";


const DiscussionForm = () => {

    const comments = [...Array(4 + 1)];

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
        console.log(newState);

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
            <Title title={`View ${comments.length} Comments`} />
            {comments.map((post, index: number) => {
                if (index > viewIndex)
                    return;
                (index: number) => updateViewIndex(index);
                return (
                    <Comment id={index}/>
                )
            })}
            <div className="discussion-actions">
                {commentsLength >= 1 && viewIndex < commentsLength && <small className="discussion-actions-small" onClick={() => viewMoreComments()}>view more Comments<FaCaretDown /></small>}
                {viewIndex > 2 && <small className="discussion-actions-small" onClick={() => collapseComments()}>collapse Comments<FaCaretUp /></small>}
            </div>
            <ReplyComment />
        </div>
    )
}

export default DiscussionForm
