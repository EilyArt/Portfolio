import Link from "next/dist/client/link"

interface Props {
    size: string,
    name: string
}

const Tag = ({size, name}: Props) => {
    return (
        <Link href={`/tag/${name}`}>
            <a className={`${size}`}>
             #{name} 
            </a>
        </Link>
    )
}


Tag.defaultProps = {
    size: "tag",
    name: ""
}

export default Tag