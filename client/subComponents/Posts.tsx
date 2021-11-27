import img from "@/images/sample.jpeg"
import img1 from "@/images/test.jpeg"
import img2 from "@/images/avatar.png"
import Image from "next/dist/client/image"
import Link from "next/link"
import Tag from "./Tag"
import Button from "./Button"
import { useState } from "react";

interface Props {
    star: boolean,
    posts: Array<object>
}

const Posts = ({ star, posts }: Props) => {

    // const LoadMore = () => {
    //     document.getElementById("load-more-button")?.classList.add("hidden");
    //     const hiddenPosts = document.getElementsByClassName("posts-post");
    //     for (let i = 0; i < hiddenPosts.length; i++) {
    //         hiddenPosts[i].classList.add("show");
    //     }
    // }

    const initialState = {
        postsLength: posts.length - 1,
        viewIndex: 16
    }

    const [reply, setReply] = useState(initialState);

    const { postsLength, viewIndex } = reply;

    const viewMoreposts = () => {
        const newState = {
            postsLength: postsLength,
            viewIndex: viewIndex + 2
        }
        setReply(newState);
    }

    return (
        <div className="col">
            <div className="posts">
                {posts && posts.slice(0, viewIndex).map((post: any, index: number) => {
                    console.log(post.createdAt)
                        return (
                            
                            <Link href={post.slug}>
                                <a className={`posts-post ${index < 3 && star && "star"}`}>
                                    <div>
                                        <Image objectFit="cover" layout="fill" 
                                        loader={() => `${process.env.NEXT_PUBLIC_API}media/${post.thumbnail}`} 
                                        src={`${process.env.NEXT_PUBLIC_API}media/${post.thumbnail}`} />
                                        <div className="posts-post-content">
                                            <div className="posts-post-content-meta">
                                                <span className="posts-post-content-meta-minutes">
                                                    {post.duration} min read
                                                </span>
                                                <time className="posts-post-content-meta-date" dateTime="2020-11-12"> {new Date(post.createdAt).toDateString()}</time>
                                            </div>
                                            <h2 className="posts-post-content-title">
                                                {post.title}
                                            </h2>
                                            <p className="posts-post-content-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0, 150) + `...` }}/>
                                            <div className="posts-post-content-bottom">
                                                <div className="posts-post-content-bottom-writer">
                                                    <div className="posts-post-content-bottom-writer-pic">
                                                        <div className="posts-post-content-bottom-writer-pic-wrapper">
                                                            <Image
                                                                objectFit="cover"
                                                                layout="intrinsic"
                                                                src={img2} />
                                                        </div>
                                                    </div>
                                                    <h6 className="posts-post-content-bottom-writer-name">Eilya Amin in</h6>
                                                </div>
                                                {post.tag.slice(0, 5).map((tag: { name: string }, index: number) => {
                                                    return (
                                                        <Tag size="sm-tag" name={tag.name} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                })}
            </div>
            {posts.length >= 12 && <div id="load-more-button" className="loadMore">
                <button onClick={() => viewMoreposts()}
                    className="button">
                    <span className="button-span" >
                        Load More
                    </span>
                </button>
            </div>}
        </div>
    )
}

Posts.defaultProps = {
    star: false,
    posts: []
}

export default Posts
