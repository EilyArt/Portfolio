import Image from "next/dist/client/image"

const AboutSection = ({ src, title, records }: any) => {
    return (
        <div className="aboutSection">
            <h2>
                <span>
                    <i>
                        <Image height="20" width="20" src={src} />
                    </i>
                </span>
                {title}
            </h2>
            <div className="aboutSection-items">
                {records && records.map((record: any) => {
                    return (
                        <div className="timeline">
                            <h4 dangerouslySetInnerHTML={{ __html: record.label }} />
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
