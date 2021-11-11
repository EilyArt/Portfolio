const ProgressTable = () => {
    return (
        <div>
            <span className="progressTable-box">
                <div className="progressTable-box-items">
                    <i className="progressTable-item">
                        <h5 className="progressTable-item-title">Front-end</h5>
                        <div className="progressTable-item-progress">
                            <div className="progressTable-item-progress-bar" style={{ width: "50%" }}></div>
                        </div>
                    </i>
                    <i className="progressTable-item">
                        <h5 className="progressTable-item-title">Back-end</h5>
                        <div className="progressTable-item-progress">
                            <div className="progressTable-item-progress-bar" style={{ width: "70%" }}></div>
                        </div>
                    </i>
                    <i className="progressTable-item">
                        <h5 className="progressTable-item-title">Database</h5>
                        <div className="progressTable-item-progress">
                            <div className="progressTable-item-progress-bar" style={{ width: "60%" }}></div>
                        </div>
                    </i>
                    <i className="progressTable-item">
                        <h5 className="progressTable-item-title">Data Science</h5>
                        <div className="progressTable-item-progress">
                            <div className="progressTable-item-progress-bar" style={{ width: "90%" }}></div>
                        </div>
                    </i>
                </div>
            </span>
        </div>
    )
}

export default ProgressTable
