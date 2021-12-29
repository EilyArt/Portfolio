import Image from "next/dist/client/image"

const AboutSection = ({ src, title, records }: any) => {
    return (
        <div className="aboutSection">
            <h4>
                <span>
                    <i>
                        <Image layout="fixed" height={25} width={25} objectFit="contain" src={src} className="SvG" alt="svg"/>
                    </i>
                </span>
                {title}
            </h4>
            <div className="aboutSection-items">
                {records && records.map((record: any) => {
                    return (
                        <div className="timeline">
                            <h5 dangerouslySetInnerHTML={{ __html: record.label }} />
                            <time dangerouslySetInnerHTML={{ __html: record.date }} />
                            <p dangerouslySetInnerHTML={{ __html: record.description }} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AboutSection