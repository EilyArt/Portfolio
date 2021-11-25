import { FaLinkedinIn, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link"
import { useRouter } from "next/dist/client/router";
import MediaIcon from '../subComponents/MediaIcon';
import Image from "next/dist/client/image";
import logo from "@/svgs/logo.svg"

const Navbar = () => {
    const router = useRouter();

    return (
        <div className="navbar pad-default-horizontal">
            <div className="navbar-socialLinks">
                <MediaIcon media="linkedin" />
                <MediaIcon media="twitter" />
                <MediaIcon media="youtube" />
                <MediaIcon media="github" />
            </div>
            <div className="navbar-links">
                        <Link href="/"><a className={`${router.pathname.toString() === "/" && "linkActive"}  pad-2`}>Home</a></Link>
                        <Link href="/blog"><a className={`${router.pathname.includes("blog") && "linkActive"}  pad-2`}>Blog</a></Link>
                        <Link href="/portfolio"><a className={`${router.pathname.includes("portfolio") && "linkActive"}  pad-2`}>Portfolio</a></Link>
                        <Link href="/resume">
                            <a
                                className={`${(router.pathname.includes("resume") ||  router.pathname.includes("about")) && "linkActive"} pad-2`}
                            >
                                About
                            </a>
                        </Link>
                        <Link href="/contact"><a className={`${router.pathname.includes("contact") && "linkActive"}  pad-2`}>Contact</a></Link>
            </div>
            <div className="navbar-logo">
                <Image height="50" width="50" src={logo} alt="logo" className="svgColor" />
            </div>
        </div>
    )
}

export default Navbar
