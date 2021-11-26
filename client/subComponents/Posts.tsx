import img from "@/images/sample.jpeg"
import img1 from "@/images/test.jpeg"
import img2 from "@/images/avatar.png"
import Image from "next/dist/client/image"
import Link from "next/link"
import Tag from "./Tag"
import Button from "./Button"

const Posts = ({ star, posts }: any) => {

    const LoadMore = () => {
        document.getElementById("load-more-button")?.classList.add("hidden");
        const hiddenPosts = document.getElementsByClassName("posts-post");
        for (let i = 0; i < hiddenPosts.length; i++) {
            hiddenPosts[i].classList.add("show");
        }
    }

    return (
        <div className="col">
            <div className="posts">
                {posts && posts.map((post: object, index: number) => {
                    return (
                        <Link href={post.slug}>
                            <a className={`posts-post ${index < 3 && star && "star"}`}>
                                <div>
                                    <Image objectFit="cover" layout="fill" src={img} />
                                    <div className="posts-post-content">
                                        <div className="posts-post-content-meta">
                                            <span className="posts-post-content-meta-minutes">
                                                2 min read
                                            </span>
                                            <time className="posts-post-content-meta-date" dateTime="2020-11-12"> Nov 12, 2020</time>
                                        </div>
                                        <h2 className="posts-post-content-title">
                                            {post.title}
                                        </h2>
                                        <p className="posts-post-content-excerpt">
                                            {post.description.slice(0, 250)}...
                                        </p>
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
                                            {post.tag.map((tag:string) => {
                                                return(
                                                    <Tag size="sm-tag" name={tag.name}/>
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
                <button onClick={() => LoadMore()}
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
