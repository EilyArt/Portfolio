import Image from "next/dist/client/image"
import { FaStar } from "react-icons/fa"

const BestSellerProject = ({ src, alt, title }: any) => {
    return (
        <div>
            <div>
                <Image
                    src={src}
                    alt={alt}
                    id={alt}
                    objectFit="cover"
                    layout="intrinsic"
                    height="180px"
                    width="300px"
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
        </div>
    )
}

export default BestSellerProject
