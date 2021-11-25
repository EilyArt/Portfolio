import Layout from "@/components/Layout"
import Posts from "@/subComponents/Posts"
import Title from "@/subComponents/Title"
import img from "@/images/sample3.jpeg"
import Image from "next/dist/client/image"
import Tag from "@/subComponents/Tag"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MediaIcon from "@/subComponents/MediaIcon"
import DiscussionForm from "@/subComponents/DiscussionForm"
import Link from "next/dist/client/link"

const post = () => {
    return (
        <Layout>
            <div className="post pad-default">
                <div className="post-content">
                    <div className="post-content-wrapper">
                        <Image objectFit="cover" className="post-content-wrapper-img" src={img} />
                    </div>
                    <div className="post-content-thumbnail">
                        <div className="post-content-thumbnail-meta">
                            <span className="post-content-thumbnail-meta-minutes">
                                2 min read
                            </span>
                            <time className="post-content-thumbnail-meta-date" dateTime="2020-11-12"> Nov 12, 2020</time>
                        </div>
                        <h2 className="post-content-thumbnail-title">
                            Believe and act as if it were impossible to fail
                        </h2>
                        <div className="post-content-thumbnail-bottom">
                            <div className="post-content-thumbnail-bottom-writer">
                                <div className="post-content-thumbnail-bottom-writer-pic">
                                    <div className="post-content-thumbnail-bottom-writer-pic-wrapper">
                                        <Image
                                            objectFit="cover"
                                            layout="intrinsic"
                                            src={img} />
                                    </div>
                                </div>
                                <h6 className="post-content-thumbnail-bottom-writer-name">Eilya Amin in</h6>
                            </div>
                            <Tag />
                            <Tag />
                            <Tag />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="post-socialMedia">
                        <MediaIcon media="linkedin" />
                        <MediaIcon media="twitter" />
                        <MediaIcon media="youtube" />
                        <MediaIcon media="github" />
                    </div>
                </div>
                <div className="post-prevNext">
                    <Link href="/slug">
                        <a className="post-prevNext-container previusPost">
                            <div className="post-prevNext-container-wrapper">
                                <Image objectFit="cover" layout="fill" src={img} />
                            </div>
                            <div className="post-prevNext-container-info">
                                <span><FaAngleLeft /> Previus Post</span>
                                <h2 className="posts-post-content-title">
                                    Believe and act as if it were impossible to fail
                                </h2>
                            </div>
                        </a>
                    </Link>
                    <Link href="/slug">
                        <a className="post-prevNext-container nextPost">
                            <div className="post-prevNext-container-wrapper">
                                <Image objectFit="cover" layout="fill" src={img} />
                            </div>
                            <div className="post-prevNext-container-info">
                                <span id="nextPost">Next Post <FaAngleRight /></span>
                                <h2 className="posts-post-content-title">
                                    Believe and act as if it were impossible to fail
                                </h2>
                            </div>
                        </a>
                    </Link>
                </div>
                <Title title="You may also like" />
                <Posts />
                <DiscussionForm />
            </div>
        </Layout>
    )
}

export default post
