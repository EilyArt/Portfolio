import { FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import React, { useState } from "react";

const ReplyComment = ({ placeholder, PARENT, POST }: any) => {

    const validateEmail = (email: String) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const [formData, setFormData] = useState({
        username: "",
        comment: "",
        email: "",
    });

    const { comment, username, email } = formData;

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
        if (!validateEmail(email))
            return notify("Please enter a valid email address!", "warning");
        await axios({
            url: `${process.env.NEXT_PUBLIC_API}graphql/`,
            method: 'POST',
            data: {
                query: `
                mutation{
                    addComment(post: ${POST}, parent: ${PARENT}, username: "${username}", email: "${email}", comment:"${comment}") {
                      comment{
                        username
                      }
                    }
                }`
            }
        }).then((res: any) => {
            notify(`dear ${res.data.data.addComment.comment.username}, your comment has been recieved, it will appear after a quick review.`, "success")
            setFormData({ comment: "", username: "", email: "" });
        }).catch((err: any) => {
            notify("An Error has occured. Sorry for inconvenience", "danger")
        });
    }

    return (
        <div className="reply">
            <div className="reply-info">
                <input
                    type="text"
                    name="username"
                    minLength={3}
                    value={username}
                    onChange={(event) => onChange(event)}
                    placeholder="Your Name"
                    required />
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => onChange(event)}
                    placeholder="Your email"
                    required />
            </div>
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