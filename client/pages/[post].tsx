import Layout from "@/components/Layout"
import Posts from "@/subComponents/Posts"
import Title from "@/subComponents/Title"
import img from "@/images/sample3.jpeg"
import Image from "next/dist/client/image"
import Tag from "@/subComponents/Tag"

const post = () => {
    return (
        <Layout>
            <div className="post pad-default">
                <div className="post-content">
                    <div className="post-content-wrapper">
                        <Image objectFit="cover"  className="post-content-wrapper-img" src={img} />
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
                <Title title="You may also like" />
                <Posts />
            </div>
        </Layout>
    )
}

export default post
