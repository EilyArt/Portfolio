import Link from "next/dist/client/link"

interface Props {
    size: string,
    name: string
}

const Tag = ({ size, name }: Props) => {
    return (
        <a href={`/tag/${name}`} className={`${size}`}>
            <small>
                &#x23; {name}
            </small>
        </a>
    )
}


Tag.defaultProps = {
    size: "tag",
    name: ""
}

export default Tag