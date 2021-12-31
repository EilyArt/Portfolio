import Image from "next/image";

type Props = {
    skills: Array<object>
};

const ProgressTable = ({ skills }: Props) => {
    return (
        <div>
            <span className="progressTable-box">
                <div className="progressTable-box-items">
                    {skills.map((skill: any) => {
                        return (
                            <i key={skill.id} className="progressTable-item">
                                <div className="progressTable-item-info m-bottom-1">
                                    <Image
                                        alt={`${skill.title}`}
                                        objectFit="cover"
                                        height={40}
                                        width={40}
                                        loader={() => `${process.env.NEXT_PUBLIC_API}media/${skill.logo}`}
                                        src={`${process.env.NEXT_PUBLIC_API}media/${skill.logo}`}
                                    />
                                    <h5 className="progressTable-item-title m-horizontal-2">{skill.title}<p>{skill.percentage}%</p></h5>
                                </div>
                                <div className="progressTable-item-progress">
                                    <div className="progressTable-item-progress-bar" style={{ width: `${skill.percentage}%` }}></div>
                                </div>
                            </i>
                        )
                    })}
                </div>
            </span>
        </div>
    )
}

export default ProgressTable
