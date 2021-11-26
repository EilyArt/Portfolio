import Link from "next/dist/client/link"

const Tag = ({size, name}: any) => {
    return (
        <Link href="/tag/slug">
            <a className={`${size}`}>
             {name} 
            </a>
        </Link>
    )
}


Tag.defaultProps = {
    size: "tag",
    name: ""
}

export default Tag