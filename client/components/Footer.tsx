import { FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import photo from "@/images/avatar.png"
import Image from "next/dist/client/image";
import InputEmail from "../subComponents/InputEmail";
import LatestNewsBox from "../subComponents/LatestNewsBox";
import BestSellerProject from "../subComponents/BestSellerProject";
import MediaIcon from '../subComponents/MediaIcon';


interface Props {
    lastProject: any,
    lastThreePosts: Array<object>,
}

const Footer = ({ lastProject, lastThreePosts }: Props) => {
    console.log(lastProject);
    
    return (
        <footer className="pad-default pad-bottom-0">
            <div className="container container-top">
                <div className="col width-fit">
                    <h2>EILYA AMIN</h2>
                    <h5>Software Engineer</h5>
                </div>
                <div className="col container-top-media">
                    <div className="row">
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
                    <h3 className="m-bottom-2">Contact</h3>
                    <div className="pad-vertical-2">
                        <address><FaMapMarkerAlt className="m-right-2" />Istanbul</address>
                    </div>
                    <div className="pad-vertical-2">
                        <a><FaWhatsapp className="m-right-2" />+2 392 3929 210</a>
                    </div>
                    <div className="pad-vertical-2">
                        <a><FaPaperPlane className="m-right-2" /> info@yourdomain.com</a>
                    </div>
                    <div className="pad-vertical-2">
                        <h3 className="pad-vertical-2">My Newsletter</h3>
                        <p className="pad-vertical-2">Please join my newsletter to get notifications for new posts and projects.<br /> It can make my day ;)</p>
                        <div className="pad-vertical-2">
                            <InputEmail />
                        </div>
                    </div>
                </div>
                <div className="col m-right-2">
                    <h3 className="m-bottom-2">Latest Posts</h3>
                    {lastThreePosts.map((post: any) => {
                        return (
                            <LatestNewsBox
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
                    <h3 className="m-bottom-2">Projects</h3>
                    <BestSellerProject
                        src={lastProject.images[0].image}
                        alt={`${lastProject.images[0].alt}`}
                        title={`${lastProject.name}`} />
                </div>
                <div className="col m-right-2">
                    <h3 className="m-bottom-2">Twitter</h3>
                    <Image
                        src={photo}
                        alt="photo"
                        objectFit="cover"
                        layout="fixed"
                        height="250px"
                        width="300px"
                        className="b-radius"
                    />
                </div>
            </div>
            <div className="separation-1" />
            <div className="container rights">
                <small className="width-fit">Copyright © 2021 All rights reserved.</small>
                <small className="copyright width-fit">This website is made by <b>EILYA</b>.</small>
            </div>
        </footer>
    )
}

export default Footer
