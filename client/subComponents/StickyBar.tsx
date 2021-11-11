import Image from "next/dist/client/image"
import photo from "@/images/avatar.png"
import Button from "./Button";
import email from "@/svgs/email.svg"
import phone from "@/svgs/phone.svg"
import calendar from "@/svgs/calendar.svg"
import StickyBarItem from "./StickyBarItem";
import arrow from "@/svgs/arrow.svg"

const StickyBar = () => {

    const showContent = () => {
        document.getElementById("stickyBar-information")?.classList.toggle("show");
    }
    return (
        <aside className="stickyBar">
            <div className="stickyBar-label" onClick={() => showContent()}>
                <Image height="10" width="15" src={arrow} className="stickyBarItem-box-item-img" />
            </div>
            <div className="stickyBar-container">
                <div className="stickyBar-container-img">
                    <Image src={photo} />
                </div>
                <div className="stickyBar-container-sub">
                    <h1 className="stickyBar-container-sub-name">Eilya Amin</h1>
                    <div className="badge">software engineer</div>
                </div>
            </div>
            <div id="stickyBar-information" className="stickyBar-resHandler">
                <div className="separation-2" />
                <div className="stickyBar-items">
                    <StickyBarItem src={email} title="email" content="eilya@example.com" />
                    <StickyBarItem src={phone} title="phone" content="+1 (930) 323-3345" />
                    <StickyBarItem src={calendar} title="birthday" content="April 5th, 1998" />
                </div>
                <div className="stickyBar-button">
                    <Button id="stickyBar-button" name="download CV" />
                </div>
            </div>
        </aside>
    )
}

export default StickyBar
