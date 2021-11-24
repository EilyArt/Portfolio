import { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import StickyBarItem from '@/subComponents/StickyBarItem'
import MediaIcon from '@/subComponents/MediaIcon'
import { FaPaperPlane } from "react-icons/fa";
import React, { useState } from 'react'
import boxLogo from "@/images/star.png"

interface Props { }

const contact: NextPage<Props> = () => {

    const initialState = {
        name: '',
        email: '',
        subject: '',
        content: ''
    };


    const [formData, setFormData] = useState(initialState);

    const { name, email, subject, content } = formData

    const onChange = (event: any) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Layout>
            <div className='pad-default'>
                <Header span='Showcasing some of my best work' header='Contact' />
            </div>
            <div className='contact pad-default-horizontal'>
                <div className='contact-info'>
                    <h2>DON'T BE SHY !</h2>
                    <p>
                        Feel free to get in touch with me. I am always open to discussing
                        new projects, creative ideas or opportunities to be part of your
                        visions.
                    </p>
                    <div className='contact-info-items'>
                        <StickyBarItem
                            src={boxLogo}
                            title='ADDRESS POINT'
                            content='123 Stree New York City '
                        />
                        <StickyBarItem
                            src={boxLogo}
                            title='MAIL ME'
                            content='eilya@mail.com'
                        />
                        <StickyBarItem
                            src={boxLogo}
                            title='CALL ME'
                            content='+90 533 838 0450'
                        />
                    </div>
                    <div className='contact-info-social'>
                        <MediaIcon media='linkedin' />
                        <MediaIcon media='twitter' />
                        <MediaIcon media='youtube' />
                        <MediaIcon media='github' />
                    </div>
                </div>
                <form className='contact-form'>
                    <h2>Free Consultaion</h2>
                    <div className="contact-form-info">
                        <input
                            type="text"
                            name="name"
                            minLength={3}
                            value={name}
                            onChange={(event) => onChange(event)}
                            className="contact-form-input"
                            placeholder="Your Name"
                            required />
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => onChange(event)}
                            className="contact-form-input"
                            placeholder="Your email@example.com"
                            required />
                    </div>
                    <input
                        name="subject"
                        type="text"
                        value={subject}
                        onChange={(event) => onChange(event)}
                        className="contact-form-input"
                        placeholder="your subject"
                        required />
                    <textarea
                        name="content"
                        value={content}
                        onChange={(event) => onChange(event)}
                        className="contact-form-input"
                        placeholder="your message"
                        required />
                    <div onClick={() => document.getElementById("contactSubmitButton")?.click()} id="contactButton" className="contact-form-submitFormButton">
                        <div id="cover" className="contact-form-submitFormButton-cover" />
                        <span className="contact-form-submitFormButton-span">
                            <h4>Send Message</h4>
                        </span>
                        <button id="contactSubmitButton" type="submit" className="contact-form-submitFormButton-button">
                            <span className="contact-form-submitFormButton-button-span">
                                <FaPaperPlane />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default contact