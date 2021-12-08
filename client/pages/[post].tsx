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
import { useQuery } from '@apollo/client';
import GET_PRODUCT_BY_ID from '../lib/queries/getProductById';
import { initializeApollo } from '../lib/apollo';
const VARIABLE = 'again-land-know';


const post = () => {
    const { data, error, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: { code: VARIABLE },
    });

    if (error || !data.post) return <h2>404 | Product Not Found</h2>;


    return (
        <Layout lastThreePosts={data.lastNPosts} lastProject={data.lastProject} postMetas={data.postMetas} title={data.post.title}>
            <div className="post pad-default">
                <div className="post-content">
                    <div className="post-content-wrapper">
                        <Image
                            objectFit="cover"
                            height={450}
                            width={700}
                            alt={`${data.post.thumbnailAlt}`}
                            className="post-content-wrapper-img"
                            loader={() => `${process.env.NEXT_PUBLIC_API}media/${data.post.thumbnail}`}
                            src={`${process.env.NEXT_PUBLIC_API}media/${data.post.thumbnail}`}
                        />
                    </div>
                    <div className="post-content-thumbnail">
                        <div className="post-content-thumbnail-meta">
                            <span className="post-content-thumbnail-meta-minutes">
                                {data.post.duration} min read
                            </span>
                            <time className="post-content-thumbnail-meta-date" dateTime="2020-11-12"> {new Date(data.post.createdAt).toDateString()}</time>
                        </div>
                        <h2 className="post-content-thumbnail-title">
                            {data.post.title}
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
                            {data.post.tags.map((tag: { name: string }, index: number) => {
                                return (
                                    <Tag size="sm-tag" name={tag.name} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="pad-default-horizontal">
                    <article className="posts-post-content-excerpt" dangerouslySetInnerHTML={{ __html: data.post.description }} />
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
                    <Link href={`/${data.prevNextPosts[0].slug}`}>
                        <a className="post-prevNext-container previusPost">
                            <div className="post-prevNext-container-wrapper">
                                <Image objectFit="cover" layout="fill" src={img} />
                            </div>
                            <div className="post-prevNext-container-info">
                                <span><FaAngleLeft /> Previus Post</span>
                                <h2 className="posts-post-content-title">
                                    {data.prevNextPosts[0].title}
                                </h2>
                            </div>
                        </a>
                    </Link>
                    <Link href={`/${data.prevNextPosts[1].slug}`}>
                        <a className="post-prevNext-container nextPost">
                            <div className="post-prevNext-container-wrapper">
                                <Image objectFit="cover" layout="fill" src={img} />
                            </div>
                            <div className="post-prevNext-container-info">
                                <span id="nextPost">Next Post <FaAngleRight /></span>
                                <h2 className="posts-post-content-title">
                                    {data.prevNextPosts[1].title}
                                </h2>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="pad-default">
                    <Title title="You may also like" />
                    <Posts posts={data.threeRelatedPosts} />
                </div>
                <div className="post-discussion">
                    <DiscussionForm comments={data.allComments} />
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GET_PRODUCT_BY_ID,
        variables: { code: VARIABLE },
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        }
    };
};

export default post