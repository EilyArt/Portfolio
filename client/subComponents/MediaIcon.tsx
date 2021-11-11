import { FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const MediaIcon = ({media}: any) => {
    return (
        <div className="mediaIcon">
            {media === "instagram" && <FaInstagram />}
            {media === "youtube" && <FaYoutube />}
            {media === "twitter" && <FaTwitter />}
            {media === "linkedin" && <FaLinkedinIn />}
            {media === "github" && <FaGithub />}
        </div>
    )
}

export default MediaIcon
