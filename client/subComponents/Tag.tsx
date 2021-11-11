import Link from "next/dist/client/link"

const Tag = ({size}: any) => {
    return (
        <Link href="/tag/slug">
            <a className={`${size}`}>
             #NextJs 
            </a>
        </Link>
    )
}


Tag.defaultProps = {
    size: "tag"
}

export default Tag