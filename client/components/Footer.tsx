import { FaMapMarkerAlt, FaWhatsapp, FaPaperPlane, FaTwitter, FaHeart } from "react-icons/fa";
import photo from "@/images/avatar.png"
import Image from "next/dist/client/image";
import InputEmail from "../subComponents/InputEmail";
import LatestNewsBox from "../subComponents/LatestNewsBox";
import BestSellerProject from "../subComponents/BestSellerProject";
import MediaIcon from '../subComponents/MediaIcon';


interface Props {
    lastProject: any,
    cv: any,
    lastThreePosts: Array<object>,
}

const Footer = ({ lastProject, lastThreePosts, cv }: Props) => {
    return (
        <footer className="pad-default pad-bottom-0">
            <div className="container container-top">
                <div className="col width-fit">
                    <h3>EILYA AMIN</h3>
                    <h6>Software Engineer</h6>
                </div>
                <div className="col container-top-media">
                    <div>
                        <MediaIcon media="linkedin" />
                        <MediaIcon media="twitter" />
                        <MediaIcon media="youtube" />
                        <MediaIcon media="github" />
                    </div>
                </div>
            </div>
            <div className="separation-1" />
            <div className="container">
                <div className="col m-right-2">
                    <h4 className="m-bottom-2">CONTACT</h4>
                    <div className="pad-vertical-2">
                        <address><FaMapMarkerAlt className="m-right-2" />{cv && cv.address && cv.address}</address>
                    </div>
                    <div className="pad-vertical-2">
                        <a><FaWhatsapp className="m-right-2" />{cv && cv.phone && cv.phone}</a>
                    </div>
                    <div className="pad-vertical-2">
                        <a><FaPaperPlane className="m-right-2" />{cv && cv.email && cv.email}</a>
                    </div>
                </div>
                <div className="col m-right-2">
                    <h4 className="m-bottom-2">LATEST POSTS</h4>
                    {lastThreePosts.map((post: any, index: number) => {
                        return (
                            <LatestNewsBox
                                key={index}
                                src={post.thumbnail}
                                title={post.title}
                                slug={post.slug}
                                alt="photo"
                                date={post.createdAt}
                                id={post.id}
                            />
                        )
                    })}
                </div>
                <div className="col m-right-2">
                    <h4 className="m-bottom-2">PROJECTS</h4>
                    {lastProject &&  <BestSellerProject
                        src={lastProject.images[0].image}
                        alt={`${lastProject.images[0].alt}`}
                        title={`${lastProject.name}`} />}
                </div>
                <div className="col m-right-2">
                    <h4 className="m-bottom-2">TWITTER</h4>
                    <a href="https://twitter.com/EILYAAMIN?ref_src=twsrc%5Etfw"
                        className="twitterFolloButton"
                        target="_blank"
                        data-size="large"
                        data-related=""
                        data-lang="en"
                        data-show-count="false"><FaTwitter /> Follow @EILYAAMIN
                    </a>
                    <div className="pad-vertical-2">
                        <h4 className="pad-vertical-2">My Newsletter</h4>
                        <aside className="pad-vertical-2">Please join my newsletter to get notifications for new posts and projects.<br /> It can make my day ;)</aside>
                        <div className="pad-vertical-2">
                            <InputEmail />
                        </div>
                    </div>
                </div>
            </div>
            <div className="separation-1" />
            <div className="container rights">
                <small className="width-fit">Copyright © 2022 All rights reserved.</small>
                <small className="copyright width-fit">This website is made by 	&nbsp;<b>EILYA</b><FaHeart /></small>
            </div>
        </footer>
    )
}

export default Footer
