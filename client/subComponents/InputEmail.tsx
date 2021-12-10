import { FaPaperPlane } from "react-icons/fa";
import { gql } from "apollo-boost";
import client from "pages/api/apollo-client";
import React, { useState } from "react";

const InputEmail = () => {

    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const onChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitEmail = async () => {
        await client.mutate({
            mutation: gql`
            mutation {
                createFollower(email: "${email}"){
                  follower{
                    email
                  }
                }
              }`
        })
    }

    return (
        <form className="JoinNewsLetter" action="" method="post" onSubmit={() => submitEmail()}>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
                placeholder="email@example.com"
            />
            <button type="submit">
                <span className="sr-only">
                    <FaPaperPlane />
                </span>
            </button>
        </form>
    )
}

export default InputEmail
