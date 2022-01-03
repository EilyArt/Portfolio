import Link from "next/dist/client/link"

interface Props {
    size: string,
    name: string,
    id: number
}

const Tag = ({ size, name, id }: Props) => {
    return (
        <a key={id} href={`/tag/${name}`} className={`${size}`}>
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