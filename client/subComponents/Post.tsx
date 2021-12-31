import Image from "next/dist/client/image"
import Tag from "./Tag"


const Post = ({ post, index, myImage, star }: any) => {
    return (
        <div className={`postItem ${index < 3 && star && "star"}`} onClick={() => document.getElementById(post.id)?.click()}
            style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API}media/${post.thumbnail})` }}>
            <a href={`/${post.slug}`} id={post.id} />
            <div className="postItem-content">
                <div >
                    <small>
                        <aside className="postItem-content-duration">{post.duration} min read&nbsp;</aside>
                    </small>
                </div>
                <h3 className="postItem-content-title">
                    {post.title}
                </h3>
                <em className="postItem-content-excerpt">- {post.excerpt.slice(0, 100) + `...`}</em>
                <time className="postItem-content-time" dateTime="2020-11-12"> {new Date(post.createdAt).toDateString()}</time>
                <div className="postItem-content-bottom">
                    <div className="postItem-content-bottom-eilya">
                        <div className="postItem-content-bottom-eilya-img">
                            <div className="">
                                {myImage &&
                                    <Image
                                        objectFit="cover"
                                        height={80}
                                        width={80}
                                        loader={() => `${process.env.NEXT_PUBLIC_API}media/${myImage.photo}`}
                                        src={`${process.env.NEXT_PUBLIC_API}media/${myImage.photo}`}
                                        alt={myImage.alt}
                                        id={myImage.id}
                                    />}
                            </div>
                        </div>
                        <sup className=""><b>Eilya Amin</b> in&nbsp;</sup>
                    </div>
                    {post.tags.slice(0, 3).map((tag: { name: string }, index: number) => {
                        return (
                            <Tag size="sm-tag" name={tag.name} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
