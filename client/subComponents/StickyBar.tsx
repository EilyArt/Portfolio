import Image from "next/dist/client/image"
import Link from "next/dist/client/link";
import email from "@/svgs/email.svg"
import phone from "@/svgs/phone.svg"
import calendar from "@/svgs/calendar.svg"
import StickyBarItem from "./StickyBarItem";
import arrow from "@/svgs/arrow.svg"

const StickyBar = (cv: any) => {

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
                    {cv.cv && <Image
                        loader={() => `${process.env.NEXT_PUBLIC_API}media/${cv.cv.photo && cv.cv.photo}`}
                        src={`${process.env.NEXT_PUBLIC_API}media/${cv.cv.photo && cv.cv.photo}`}
                        alt={cv.cv.alt}
                        id={cv.cv.id}
                        objectFit="cover"
                        layout="intrinsic"
                        height="300px"
                        width="300px"
                    />}
                </div>
                <div className="stickyBar-container-sub">
                    <h3 className="stickyBar-container-sub-name">Eilya Amin</h3>
                    <div className="badge">software engineer</div>
                </div>
            </div>
            <div id="stickyBar-information" className="stickyBar-resHandler">
                <div className="separation-2" />
                <div className="stickyBar-items">
                    {cv.cv &&
                        <>
                            <StickyBarItem src={email} title="email" content={`${cv.cv.email && cv.cv.email}`} />
                            <StickyBarItem src={phone} title="phone" content={`${cv.cv.photo && cv.cv.phone}`} />
                        </>
                    }
                    <StickyBarItem src={calendar} title="birthday" content="April 5th, 1998" />
                </div>
                <div className="stickyBar-button" onClick={() => document.getElementById("downloadCV")?.click}>
                    {cv.cv && <Link href={`${process.env.NEXT_PUBLIC_API}media/${cv.cv.CV}`}>
                        <a id={"downloadCV"} download>
                            <button className={`button`}>
                                <span className={`button-span`} >
                                    Download CV
                                </span>
                            </button>
                        </a>
                    </Link>}
                </div>
            </div>
        </aside>
    )
}

export default StickyBar
