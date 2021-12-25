import Image from "next/dist/client/image"
import Tag from "./Tag"


const Post = ({ post, index, myImage, star }: any) => {
    return (
        <a href={`/${post.slug}`} className={` ${index < 3 && star && "star"}`}>
            <div className="postItem">
                <Image objectFit="cover" layout="fill" className="b-radius"
                    loader={() => `${process.env.NEXT_PUBLIC_API}media/${post.thumbnail}`}
                    src={`${process.env.NEXT_PUBLIC_API}media/${post.thumbnail}`}
                    loading="lazy"
                />
                <div className="postItem-content">
                    <div className="postItem-content-meta">
                        <span className="postItem-content-meta-minutes">
                            {post.duration} min read
                        </span>
                        <time className="postItem-content-meta-date" dateTime="2020-11-12"> {new Date(post.createdAt).toDateString()}</time>
                    </div>
                    <h2 className="postItem-content-title">
                        {post.title}
                    </h2>
                    <p className="postItem-content-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0, 150) + `...` }} />
                    <div className="postItem-content-bottom">
                        <div className="postItem-content-bottom-writer">
                            <div className="postItem-content-bottom-writer-pic">
                                <div className="postItem-content-bottom-writer-pic-wrapper">
                                    {myImage && <Image
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
                            <h6 className="postItem-content-bottom-writer-name">Eilya Amin in</h6>
                        </div>
                        {post.tags.slice(0, 5).map((tag: { name: string }, index: number) => {
                            return (
                                <Tag size="sm-tag" name={tag.name} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </a>
    )
}

export default Post
