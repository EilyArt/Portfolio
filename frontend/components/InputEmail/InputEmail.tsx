import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputEmail = () => {
  const validateEmail = (email: String) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

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
          theme: "dark",
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
          theme: "dark",
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
          theme: "dark",
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
          theme: "dark",
        });
        break;
      default:
        break;
    }
  };

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitEmail = async () => {
    if (!validateEmail(email))
      return notify("Please enter a valid email address!", "warning");
    await axios({
      url: `${process.env.NEXT_PUBLIC_API}graphql/`,
      method: "post",
      data: {
        query: `
              mutation {
                  createFollower(email: "${email}"){
                    follower{
                      email
                    }
                  }
                }`,
      },
    })
      .then((res: any) => {
        if (!res.data.data.createFollower)
          return notify(
            `email address ${email} already exists, Thank You!`,
            "info",
          );

        notify(
          `${res.data.data.createFollower.follower.email} has been successfully added to the newsletter, Thank You!`,
          "success",
        );
      })
      .catch((err: any) => {
        notify("An Error has occured. Sorry for inconvenience", "danger");
      });

    setFormData({ email: "" });
  };

  return (
    <div>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="JoinNewsLetter">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
          placeholder="Email address"
        />
        <button type="submit" onClick={() => submitEmail()}>
          <span className="sr-only">
            <FaPaperPlane />
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputEmail;
