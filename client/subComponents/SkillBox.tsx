import src from "@/images/design.png"
import Image from "next/dist/client/image"

const SkillBox = () => {
    return (
        <div className="skillBox-container">
            <div className="skillBox">
                <span className="skillBox-box">
                    <i className="skillBox-img">
                        <Image height="50" width="50" src={src} />
                    </i>
                    <div className="skillBox-content">
                        <h4>Web Design</h4>
                        <p>The most modern and high-quality design made at a professional level.</p>
                    </div>
                </span>
            </div>
            <div className="skillBox">
                <span className="skillBox-box">
                    <i className="skillBox-img">
                        <Image height="50" width="50" src={src} />
                    </i>
                    <div className="skillBox-content">
                        <h4> Web Development</h4>
                        <p>Web Development High-quality development of sites at the professional level.</p>
                    </div>
                </span>
            </div>
            <div className="skillBox">
                <span className="skillBox-box">
                    <i className="skillBox-img">
                        <Image height="50" width="50" src={src} />
                    </i>
                    <div className="skillBox-content">
                        <h4>Mobile Apps</h4>
                        <p>Professional development of applications for iOS and Android.</p>
                    </div>
                </span>
            </div>
            <div className="skillBox">
                <span className="skillBox-box">
                    <i className="skillBox-img">
                        <Image height="50" width="50" src={src} />
                    </i>
                    <div className="skillBox-content">
                        <h4>Mobile Apps</h4>
                        <p>Professional development of applications for iOS and Android.</p>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default SkillBox
