import Image from "next/dist/client/image"
import { FaStar } from "react-icons/fa"
import Link from "next/dist/client/link"

const BestSellerProject = ({ src, alt, title }: any) => {
    return (
        <Link href="/portfolio">
            <a>
                <div>
                    <Image
                        loader={() => `${process.env.NEXT_PUBLIC_API}media/${src}`}
                        src={`${process.env.NEXT_PUBLIC_API}media/${src}`}
                        alt={alt}
                        id={alt}
                        objectFit="cover"
                        layout="intrinsic"
                        height="180px"
                        width="300px"
                        className="b-radius"
                    />
                </div>
                <div className="pad-vertical-2" dangerouslySetInnerHTML={{ __html: title }} />
                <div>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
            </a>
        </Link>
    )
}

export default BestSellerProject
