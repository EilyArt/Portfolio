import { FaUserAlt, FaThumbsUp, FaThumbsDown, FaCaretDown, FaCaretUp, FaReply, FaTimes } from "react-icons/fa"
import { useState } from "react";
import ReplyComment from "./ReplyComment";

type Props = {
    id: number,
    comment: any,
    replies: Array<object>
};

const Comment = ({ id, comment, replies }: Props) => {
    console.log(Math.trunc((comment.likes/(comment.likes+comment.dislikes)) * 100));
    console.log(comment, replies);
    
    const initialState = {
        repliesLength: replies.length - 1,
        viewIndex: 0
    }

    const [reply, setReply] = useState(initialState);

    const { repliesLength, viewIndex } = reply;

    const viewMoreReplies = () => {
        const newState = {
            repliesLength: repliesLength,
            viewIndex: viewIndex + 2
        }
        setReply(newState);

    }

    const collapseReplies = () => {
        const newState = {
            repliesLength: repliesLength,
            viewIndex: 0
        }
        setReply(newState);
    }

    const updateViewIndex = (index: number) => {
        const newState = {
            repliesLength: repliesLength,
            viewIndex: index
        }
        setReply(newState);
    }

    return (
        <div>
            <div className="comment">
                <FaUserAlt className="comment-user" />
                <div className="comment-info">
                    <h4>{comment.username}</h4>
                    <time>{new Date(comment.createdAt).toDateString()}</time>
                    <p>{comment.comment}</p>
                    <div className="comment-info-actions">
                        <div>
                            <div className="comment-info-actions-emotion">
                                <div>
                                    <button><FaThumbsUp /></button>
                                    <small>{comment.likes}</small>
                                </div>
                                <div>
                                    <button><FaThumbsDown /></button>
                                    <small>{comment.dislikes}</small>
                                </div>
                            </div>
                            <div className="comment-info-actions-emotion-proportion">
                                <div className="comment-info-actions-emotion-proportion-bar" style={{ width: `${Math.trunc((comment.likes/(comment.likes+comment.dislikes)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <button className="comment-info-actions-comment" onClick={() => document.getElementById(`reply${id}`)?.classList.remove("hidden")}><FaReply />Reply</button>
                    </div>
                </div>
            </div>
            <div id={`reply${id}`} className="hidden">
                <button className="comment-info-actions-comment" onClick={() => document.getElementById(`reply${id}`)?.classList.add("hidden")}><FaTimes />Cancel</button>
                <ReplyComment />
            </div>
            <div className="replies">
                {replies.map((reply: any, index: number) => {
                    if (index > viewIndex)
                        return;
                    (index: number) => updateViewIndex(index);
                    return (
                        <div className="comment">
                            <FaUserAlt className="comment-user" />
                            <div className="comment-info">
                                <h4>{reply.username}</h4>
                                <time>{new Date(reply.createdAt).toDateString()}</time>
                                <p>{reply.comment}</p>
                                <div className="comment-info-actions">
                                    <div>
                                        <div className="comment-info-actions-emotion">
                                            <div>
                                                <button><FaThumbsUp /></button>
                                                <small>{reply.likes}</small>
                                            </div>
                                            <div>
                                                <button><FaThumbsDown /></button>
                                                <small>{reply.dislikes}</small>
                                            </div>
                                        </div>
                                        <div className="comment-info-actions-emotion-proportion">
                                            <div className="comment-info-actions-emotion-proportion-bar" style={{ width: `${Math.trunc((reply.likes/(reply.likes+reply.dislikes)) * 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="replies-actions">
                    {(repliesLength >= 1 && viewIndex < repliesLength) && <small onClick={() => viewMoreReplies()}>view more replies<FaCaretDown /></small>}
                    {viewIndex > 0 && <small onClick={() => collapseReplies()}>collapse replies<FaCaretUp /></small>}
                </div>
            </div>
        </div>
    )
}

export default Comment
