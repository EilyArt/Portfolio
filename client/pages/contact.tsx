import { NextPage } from 'next'
import Layout from '@/components/Layout'
import Header from '@/subComponents/Header'
import email from '@/svgs/email.svg'
import StickyBarItem from '@/subComponents/StickyBarItem'
import MediaIcon from '@/subComponents/MediaIcon'
import { FaPaperPlane } from "react-icons/fa";

interface Props { }

const contact: NextPage<Props> = () => {
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
                            src={email}
                            title='ADDRESS POINT'
                            content='123 Stree New York City '
                        />
                        <StickyBarItem
                            src={email}
                            title='MAIL ME'
                            content='eilya@mail.com'
                        />
                        <StickyBarItem
                            src={email}
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
                        <input className="contact-form-input" placeholder="Your Name" required/>
                        <input className="contact-form-input" placeholder="Your email" required/>
                    </div>
                    <input className="contact-form-input" placeholder="your subject" required/>
                    <textarea className="contact-form-input" placeholder="your message" required/>
                    <div onClick={() => document.getElementById("contactSubmitButton")?.click()} id="contactButton" className="contact-form-submitFormButton">
                        <div id="cover" className="contact-form-submitFormButton-cover"/>
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