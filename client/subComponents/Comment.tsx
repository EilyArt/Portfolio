import { FaUserAlt, FaThumbsUp, FaThumbsDown, FaCaretDown, FaCaretUp, FaReply, FaTimes } from "react-icons/fa"
import { useState } from "react";
import ReplyComment from "./ReplyComment";

type Comment = {
    id: number;
};

const Comment = ({ id }: Comment) => {

    const replies = [...Array(4 + 1)];

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
        console.log(newState);

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
                    <h4>Eilya Amin</h4>
                    <time>11 min ago</time>
                    <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                    <div className="comment-info-actions">
                        <div>
                            <div className="comment-info-actions-emotion">
                                <div>
                                    <button><FaThumbsUp /></button>
                                    <small>121</small>
                                </div>
                                <div>
                                    <button><FaThumbsDown /></button>
                                    <small>19</small>
                                </div>
                            </div>
                            <div className="comment-info-actions-emotion-proportion">
                                <div className="comment-info-actions-emotion-proportion-bar" style={{ width: "45%" }}></div>
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
                {replies.map((post, index) => {
                    if (index > viewIndex)
                        return;
                    (index: number) => updateViewIndex(index);
                    return (
                        <div className="comment">
                            <FaUserAlt className="comment-user" />
                            <div className="comment-info">
                                <h4>Eilya Amin</h4>
                                <time>11 min ago</time>
                                <p>consectetuer adipiscing elit</p>
                                <div className="comment-info-actions">
                                    <div>
                                        <div className="comment-info-actions-emotion">
                                            <div>
                                                <button><FaThumbsUp /></button>
                                                <small>121</small>
                                            </div>
                                            <div>
                                                <button><FaThumbsDown /></button>
                                                <small>19</small>
                                            </div>
                                        </div>
                                        <div className="comment-info-actions-emotion-proportion">
                                            <div className="comment-info-actions-emotion-proportion-bar" style={{ width: "45%" }}></div>
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
