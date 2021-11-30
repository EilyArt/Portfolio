import Image from "next/dist/client/image"
import Link from "next/link"

interface Props {
    src: any, 
    alt: string, 
    title: string, 
    slug: string, 
    date: string, 
    id: string 
}

const LatestNewsBox = ({ src, alt, title, slug, date, id }: Props) => {
    return (
        <Link href={`/${slug}`}>
            <a className="latestNewsBox">
                <div className="latestNewsBox-image">
                    <Image
                        loader={() => `${process.env.NEXT_PUBLIC_API}media/${src}`} 
                        src={`${process.env.NEXT_PUBLIC_API}media/${src}`}
                        alt={alt}
                        id={id}
                        objectFit="cover"
                        layout="fixed"
                        height="80px"
                        width="80px"
                        className="b-radius"
                    />
                </div>
                <div className="latestNewsBox-text">
                    <span className="latestNewsBox-text-title">{title}</span>
                    <small><time className="latestNewsBox-text-date">{new Date(date).toDateString()}</time></small>
                </div>
            </a>
        </Link>
    )
}

export default LatestNewsBox
