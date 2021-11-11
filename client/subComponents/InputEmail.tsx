import { FaPaperPlane } from "react-icons/fa";

const InputEmail = () => {
    return (
        <div className="JoinNewsLetter">
            <input type="text" className="" placeholder="email@example.com" />
            <button type="submit" className=""><span className="sr-only"><FaPaperPlane /></span></button>
        </div>
    )
}

export default InputEmail
