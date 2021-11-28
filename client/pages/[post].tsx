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
import { gql } from "@apollo/client"
import client from "./api/appolo-client"

interface Props {
    post: any
}

const post = ({ post }: Props) => {
    console.log(post);

    return (
        <Layout>
            <div className="post pad-default">
                <div className="post-content">
                    <div className="post-content-wrapper">
                        <Image
                            objectFit="cover"
                            height={450}
                            width={700}
                            className="post-content-wrapper-img"
                            loader={() => `${process.env.NEXT_PUBLIC_API}media/${post.thumbnail}`}
                            src={`${process.env.NEXT_PUBLIC_API}media/${post.thumbnail}`}
                        />
                    </div>
                    <div className="post-content-thumbnail">
                        <div className="post-content-thumbnail-meta">
                            <span className="post-content-thumbnail-meta-minutes">
                                {post.duration} min read
                            </span>
                            <time className="post-content-thumbnail-meta-date" dateTime="2020-11-12"> {new Date(post.createdAt).toDateString()}</time>
                        </div>
                        <h2 className="post-content-thumbnail-title">
                            {post.title}
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
                            {post.tag.map((tag: { name: string }, index: number) => {
                                return (
                                    <Tag size="sm-tag" name={tag.name} />
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className="pad-default-horizontal">
                    <div className="posts-post-content-excerpt" dangerouslySetInnerHTML={{ __html: post.description }} />
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
                <div className="pad-default">
                    <DiscussionForm />
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context: any) {


    const { data } = await client.query({
        query: gql`
      {
        post(slug: "${context.resolvedUrl.substring(1)}") {
            title
            slug
            thumbnail
            description
            duration
            createdAt
            tag {
               name
            }
        }
      }
      `
    })

    return {
        props: {
            post: data.post
        }
    }
}

export default post
