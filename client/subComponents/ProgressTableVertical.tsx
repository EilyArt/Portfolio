
type Props = {
    skills: Array<object>
};

const ProgressTableVertical = ({ skills }: Props) => {
    return (
        <div>
            <span className="progressTableVertical-box">
                <div className="progressTableVertical-box-items">
                    {skills.map((skill: any) => {
                        return (
                            <i key={skill.id} className="progressTableVertical-item">
                                <div className="progressTableVertical-item-progress">
                                    <div className="progressTableVertical-item-progress-bar" style={{ height: `${skill.percentage}%` }}></div>
                                </div>
                                <h5 className="progressTableVertical-item-title">{skill.title}</h5>
                            </i>
                        )
                    })}
                </div>
            </span>
        </div>
    )
}

export default ProgressTableVertical;
