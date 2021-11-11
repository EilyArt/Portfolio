import Image from "next/dist/client/image"
import Link from "next/link"

const LatestNewsBox = ({ src, alt }: any) => {
    return (
        <div className="latestNewsBox">
            <div className="latestNewsBox-image">
                <Image
                    src={src}
                    alt={alt}
                    id={alt}
                    objectFit="cover"
                    layout="fixed"
                    height="80px"
                    width="80px"
                />
            </div>
            <div className="latestNewsBox-text">
                <Link href="/slug">
                    <a className="latestNewsBox-text-title">Even the all-powerful Pointing has no control about</a>
                </Link>
                <small><time className="latestNewsBox-text-date">Oct. 16, 2019</time></small>
            </div>
        </div>
    )
}

export default LatestNewsBox
