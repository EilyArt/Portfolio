import { useEffect } from "react"
import axios from "axios";
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
import client from "./api/apollo-client"

interface Props {
    post: any,
    cv: any,
    comments: any,
    prevPost: any,
    nextPost: any,
    lastThreePosts: Array<object>,
    lastProject: any,
    postMetas: Array<object>,
    threeRelatedPosts: Array<object>,
}

const post = ({ post, cv, comments, prevPost, nextPost, lastThreePosts, lastProject, postMetas, threeRelatedPosts }: Props) => {

    useEffect(() => {
        axios({
            url: `${process.env.NEXT_PUBLIC_API}graphql/`,
            method: 'post',
            data: {
                query: `
                mutation {
                    addView(postId: ${post.id}){
                      post{
                        id
                      }
                    }
                  }                  
                  `
            }
        })
    })

    return (
        <Layout lastThreePosts={lastThreePosts} lastProject={lastProject} postMetas={postMetas} title={post.title}>
            <div className="post pad-default">
                <div className="post-content">
                    <div className="post-content-wrapper">
                        <Image
                            objectFit="cover"
                            height={450}
                            width={700}
                            alt={`${post.thumbnailAlt}`}
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
                                            alt="eilya amin"
                                            src={img} />
                                    </div>
                                </div>
                                <h6 className="post-content-thumbnail-bottom-writer-name">Eilya Amin in</h6>
                            </div>
                            {post.tags.map((tag: { name: string }, index: number) => {
                                return (
                                    <Tag size="sm-tag" name={tag.name} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="pad-default-horizontal">
                    <article className="posts-post-content-excerpt" dangerouslySetInnerHTML={{ __html: post.description }} />
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
                    <a href={`/${prevPost.slug}`} className="post-prevNext-container previusPost">
                        <div className="post-prevNext-container-wrapper">
                            <Image objectFit="cover" layout="fill" src={img} />
                        </div>
                        <div className="post-prevNext-container-info">
                            <span><FaAngleLeft /> Previus Post</span>
                            <h2 className="posts-post-content-title">
                                {prevPost.title}
                            </h2>
                        </div>
                    </a>
                    <a href={`/${nextPost.slug}`} className="post-prevNext-container nextPost">
                        <div className="post-prevNext-container-wrapper">
                            <Image objectFit="cover" layout="fill" src={img} />
                        </div>
                        <div className="post-prevNext-container-info">
                            <span id="nextPost">Next Post <FaAngleRight /></span>
                            <h2 className="posts-post-content-title">
                                {nextPost.title}
                            </h2>
                        </div>
                    </a>
                </div>
                <div className="pad-default">
                    <Title title="You may also like" />
                    <Posts posts={threeRelatedPosts} myImage={cv}/>
                </div>
                <div className="post-discussion">
                    <DiscussionForm post={post} comments={comments} />
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context: any) {


    const { data } = await client.query({
        query: gql`
        {
            allComments(slug: "${context.resolvedUrl.substring(1)}") {
              id
              post{
                id
              }
              username
              comment
              createdAt
              likes
              dislikes
              replies {
                id
                comment
                createdAt
                username
                likes
                dislikes
              }
            }
            cv{
                photo
                id
                alt
            }
            post(slug: "${context.resolvedUrl.substring(1)}") {
              id
              title
              slug
              thumbnail
              thumbnailAlt
              description
              duration
              createdAt
              tags {
                name
              }
            }
            prevNextPosts(slug: "${context.resolvedUrl.substring(1)}"){
                title
                slug
                thumbnail
            }
            threeRelatedPosts(slug: "${context.resolvedUrl.substring(1)}") {
                title
                slug
                thumbnail
                excerpt
                duration
                createdAt
                tags {
                  name
                }
            }
            lastProject {
                name
                images{
                  image
                  alt
                }
            }
            postMetas(slug: "${context.resolvedUrl.substring(1)}") {
                name
                content
            } 
            lastNPosts(N: 3) {
                id
                title
                slug
                thumbnail
                createdAt
            }
        }
      `
    })
    if (!data.post) {
        return {
            redirect: {
                destination: '/'
            }
        }
    } else
        return {
            props: {
                post: data.post,
                cv: data.cv,
                postMetas: data.postMetas,
                comments: data.allComments,
                prevPost: data.prevNextPosts[0],
                nextPost: data.prevNextPosts[1],
                lastThreePosts: data.lastNPosts,
                lastProject: data.lastProject,
                threeRelatedPosts: data.threeRelatedPosts
            }
        }
}

export default post