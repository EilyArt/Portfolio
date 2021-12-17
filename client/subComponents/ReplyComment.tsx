import { FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import React, { useState } from "react";

const ReplyComment = ({ placeholder, PARENT, POST }: any) => {

    const [formData, setFormData] = useState({
        username: "",
        comment: "",
    });

    const { comment, username } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const notify = (message: string, status: string) => {

        switch (status) {
            case "success":
                toast.success(`${message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                break;
            case "danger":
                toast.error(`${message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                break;
            case "warning":
                toast.warn(`${message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                break;
            case "info":
                toast.info(`${message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                break;
            default:
                break;
        }
    }

    const submitEmail = async () => {

        await axios({
            url: `${process.env.NEXT_PUBLIC_API}graphql/`,
            method: 'POST',
            data: {
                query: `
                mutation{
                    addComment(post: ${POST}, parent: ${PARENT}, comment:"${comment}", username: "${username}") {
                      comment{
                        username
                      }
                    }
                }`
            }
        }).then((res: any) => {
            console.log(res);
            notify(`dear ${res.data.data.addComment.comment.username}, your comment has been recieved, it will appear after a quick review.`, "success")
        }).catch((err: any) => {
            notify("An Error has occured. Sorry for inconvenience", "danger")
        });

        setFormData({ comment: "", username: "" });
    }

    return (
        <div className="reply">
            <input
                type="text"
                name="username"
                minLength={3}
                value={username}
                onChange={(event) => onChange(event)}
                className="contact-form-input"
                placeholder="Your Name"
                required />
            <textarea
                className="reply-box"
                placeholder={`${placeholder}`}
                name="comment"
                value={comment}
                onChange={(event) => onChange(event)}
            />
            <button id="sss" className="reply-postComment" type='button' onClick={() => submitEmail()}>
                <span className="reply-postComment-button">
                    <FaPaperPlane />
                </span>
            </button>
        </div>
    )
}

export default ReplyComment
