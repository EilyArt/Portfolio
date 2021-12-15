import { FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import axios from "axios";

const ReplyComment = ({ placeholder, PARENT, POST }: any) => {

    const [formData, setFormData] = useState({
        comment: "",
    });

    const { comment } = formData;

    const onChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

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
            method: 'post',
            data: {
                query: `
              mutation {
                  createFollower(email: "${comment}"){
                    follower{
                      email
                    }
                  }
                }`
            }
        }).then((res: any) => {
            if (!res.data.data.createFollower)
                return notify(`email address ${comment} already exists, Thank You!`, "info")

            notify(`${res.data.data.createFollower.follower.email} has been successfully added to the newsletter, Thank You!`, "success")
        }).catch((err: any) => {
            notify("An Error has occured. Sorry for inconvenience", "danger")
        });

        setFormData({ comment: "" });
    }

    return (
        <form className="reply">
            <textarea className="reply-box" placeholder={`${placeholder}`} />
            <button id="sss" className="reply-postComment" type='button'>
                <span className="reply-postComment-button">
                    <FaPaperPlane />
                </span>
            </button>
        </form>
    )
}

export default ReplyComment
