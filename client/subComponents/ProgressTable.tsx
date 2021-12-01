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
                                <h5 className="progressTable-item-title">{skill.title}</h5>
                                <div className="progressTable-item-progress">
                                    <div className="progressTable-item-progress-bar" style={{ height: `${skill.percentage}%` }}></div>
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
