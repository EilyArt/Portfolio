interface ButtonColor {
    name: string,
    id: string
}
// The button theme is blue by default. pass color="btn-white" to change theme to white
export default function Button({ name, id }: ButtonColor) {
    return (
        <button id={id} className={`button`}>
            <span className={`button-span`} >
                {name}
            </span>
        </button>
    )
}

// Defining default value for Button
Button.defaultProps = {
    name: "",
    id: ""
}