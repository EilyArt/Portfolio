import Image from "next/dist/client/image"
import Link from "next/link"

const LatestNewsBox = ({ src, alt }: any) => {
    return (
        <Link href="/slug">
            <a className="latestNewsBox">
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
                    <span className="latestNewsBox-text-title">Even the all-powerful Pointing has no control about</span>
                    <small><time className="latestNewsBox-text-date">Oct. 16, 2019</time></small>
                </div>
            </a>
        </Link>
    )
}

export default LatestNewsBox
