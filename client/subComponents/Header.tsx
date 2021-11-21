const Header = ({span, header}: any) => {
    return (
        <div className="header">
            <span>{span}</span>
            <h1>{header}</h1>
            <div />
        </div>
    )
}

export default Header