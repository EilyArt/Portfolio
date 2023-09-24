import Header from "@/components/Header/Header";
import StickyBarItem from "@/components/StickyBarItem/StickyBarItem";
import MediaIcon from "@/components/MediaIcon/MediaIcon";
import { FaPaperPlane } from "react-icons/fa";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import phone from "@/svgs/phone.svg";
import { queryBlog as query } from "../../middleware/queries";
import { useQuery } from "@apollo/client";
import Head from "next/head";

const contact = () => {
  const initialState = {
    name: "",
    email: "",
    subject: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, subject, content } = formData;

  const { data, loading, error } = useQuery(query);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const { page, cv, pageMetas } = data;

  return (
    <>
      <Head>
        <title>{`${page?.title}`}</title>
        {pageMetas?.map((meta: any, index: number) => {
          return (
            <meta
              key={index}
              name={`${meta.name}`}
              content={`${meta.content}`}
            />
          );
        })}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
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
      <div className="pad-default">
        <Header
          span="One step away from achieving your dreams"
          header="Contact"
        />
      </div>
      <div className="contact pad-default-horizontal">
        <div className="contact-info">
          <h3>DON'T BE SHY !</h3>
          <aside>
            Feel free to get in touch with me. I am always open to discussing
            new projects, creative ideas or opportunities to be part of your
            visions.
          </aside>
          <div className="contact-info-items">
            <StickyBarItem
              src={phone}
              title="ADDRESS POINT"
              content={`${cv && cv.address}`}
            />
            <StickyBarItem
              src={phone}
              title="MAIL ME"
              content={`${cv && cv.email}`}
            />
            <StickyBarItem
              src={phone}
              title="CALL ME"
              content={`${cv && cv.phone}`}
            />
          </div>
          <div className="contact-info-social">
            <MediaIcon media="linkedin" />
            <MediaIcon media="twitter" />
            <MediaIcon media="youtube" />
            <MediaIcon media="github" />
          </div>
        </div>
        <div className="contact-form">
          <h3>Free Consultaion</h3>
          <div className="contact-form-info">
            <input
              type="text"
              name="name"
              minLength={3}
              value={name}
              // onChange={(event) => onChange(event)}
              className="contact-form-input"
              placeholder="full Name"
              required
            />
            <input
              name="email"
              type="email"
              value={email}
              // onChange={(event) => onChange(event)}
              className="contact-form-input"
              placeholder="E-mail address"
              required
            />
          </div>
          <input
            name="subject"
            type="text"
            value={subject}
            // onChange={(event) => onChange(event)}
            className="contact-form-input"
            placeholder="subject"
            required
          />
          <textarea
            name="content"
            value={content}
            // onChange={(event) => onChange(event)}
            className="contact-form-input"
            placeholder="message"
            required
          />
          <div
            onClick={() =>
              document.getElementById("contactSubmitButton")?.click()
            }
            id="contactButton"
            className="contact-form-submitFormButton"
          >
            <div id="cover" className="contact-form-submitFormButton-cover" />
            <span className="contact-form-submitFormButton-span">
              <h5>Send Message</h5>
            </span>
            <button
              id="contactSubmitButton"
              type="button"
              className="contact-form-submitFormButton-button"
              // onClick={(event) => submitContact(event)}
            >
              <span className="contact-form-submitFormButton-button-span">
                <FaPaperPlane />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default contact;

// const validateEmail = (email: String) => {
//     return String(email)
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );
// };

// const onChange = (event: any) => {
//     event.preventDefault();
//     setFormData({ ...formData, [event.target.name]: event.target.value });
// }

// const notify = (message: string, status: string) => {
//     switch (status) {
//         case "success":
//             toast.success(`${message}`, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark"
//             });
//             break;
//         case "danger":
//             toast.error(`${message}`, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark"
//             });
//             break;
//         case "warning":
//             toast.warn(`${message}`, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark"
//             });
//             break;
//         case "info":
//             toast.info(`${message}`, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark"
//             });
//             break;
//         default:
//             break;
//     }
// }

// const submitContact = async (event: any) => {
//     event.preventDefault();
//     if (!validateEmail(email))
//         return notify("Please enter a valid email address!", "warning");
//     if (subject.length === 0 || content.length === 0 || name.length === 0)
//         return notify("Please fill all the fields of the form!", "warning");
//     await axios({
//         url: `${process.env.NEXT_PUBLIC_API}graphql/`,
//         method: 'post',
//         data: {
//             query: `
//             mutation{
//                 createContact(email:"${email}", name:"${name}", description: "${content}", subject: "${subject}") {
//                       contact{
//                         name
//                     }
//                 }
//               }
//               `
//         }
//     }).then((res: any) => {
//         return notify(`Thank You dear ${res.data.data.createContact.contact.name} for contacting me. I will get back to you in less than 24 hours.`, "success");
//     }).catch((err: any) => {
//         return notify("An Error has occured. Sorry for inconvenience", "danger")
//     });

//     return setFormData(initialState);
// }
