import { FaLinkedinIn, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link"
import { useRouter } from "next/dist/client/router";
import MediaIcon from '../subComponents/MediaIcon';
import Image from "next/dist/client/image";
import logo  from "@/svgs/logo.svg"

const Navbar = () => {
    const router = useRouter();

    return (
        <div className="navbar pad-default-horizontal row">
            <div className="col navbar-logo">
                <Image height="50" width="50" src={logo} alt="logo" className="svgColor"/>
            </div>
            <div className="col">
                <div className="row">
                    <div className="navbar-links">
                        <Link href="/"><a className={`${router.pathname.toString() === "/" && "linkActive"}  pad-2`}>Home</a></Link>
                        <Link href="/resume">
                            <a
                                className={`${(router.pathname.includes("expertise") ||
                                    router.pathname.includes("timeline") ||
                                    router.pathname.includes("background")) && "linkActive"
                                    } pad-2`}
                            >
                                About
                            </a>
                        </Link>
                        <Link href="/blog"><a className={`${router.pathname.includes("blog") && "linkActive"}  pad-2`}>Blog</a></Link>
                        <Link href="/portfolio"><a className={`${router.pathname.includes("Portfolio") && "linkActive"}  pad-2`}>Portfolio</a></Link>
                        <Link href="/contact"><a className={`${router.pathname.includes("contact") && "linkActive"}  pad-2`}>Contact</a></Link>
                    </div>
                </div>
            </div>
            <div className="navbar-menu">
                MENU
            </div>
        </div>
    )
}

export default Navbar
