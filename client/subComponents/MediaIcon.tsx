import { FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const MediaIcon = ({media, link}: any) => {
    return (
        <a className="mediaIcon" href={`${link}`}>
            {media === "instagram" && <FaInstagram />}
            {media === "youtube" && <FaYoutube />}
            {media === "twitter" && <FaTwitter />}
            {media === "linkedin" && <FaLinkedinIn />}
            {media === "github" && <FaGithub />}
        </a>
    )
}

export default MediaIcon
