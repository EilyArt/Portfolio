import img from "@/images/sample.jpeg"
import img1 from "@/images/test.jpeg"
import img2 from "@/images/avatar.png"
import Image from "next/dist/client/image"
import Link from "next/link"
import Tag from "./Tag"
import Button from "./Button"
import Post from "./Post"
import { useState } from "react";

interface Props {
    star: boolean,
    posts: Array<object>,
    myImage: any
}

const Posts = ({ star, posts, myImage }: Props) => {
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
        <div>
            <div className="posts">
                {posts && posts.slice(0, viewIndex).map((post: any, index: number) => {
                    return (
                        <Post post={post} index={index} myImage={myImage} star={star} />
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
