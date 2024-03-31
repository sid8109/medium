import { Link, useNavigate } from "react-router-dom"
import LabelledInput from "./LabelledInput"
import { SignupInput } from "@sid_81/common"
import { useState } from "react"
import axios from "axios"
import BACKEND_URL from "../../config"

const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            localStorage.setItem("token", response.data.jwt)
            navigate("/blogs")
        } catch(e) {
            console.log("login failed")
        }
    }

    return (
        <div className="h-screen flex items-center">
            <div className="mx-auto">
                <div className="text-3xl font-bold mb-1 text-center">
                    Create an Account
                </div>
                <div className="text-gray-500 text-md text-center mb-5">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link to={type === "signup" ? "/signin" : "/signup"} className="pl-1 underline">{type === "signup" ? "Login" : "Sign Up"}</Link>
                </div>

                {type === "signup" ? <LabelledInput label="Name" placeholder="Siddharth Gogri" type="text" onChange={(e) => {
                    setPostInputs(prev => ({
                        ...prev,
                        name: e.target.value
                    }))
                }} /> : null}
                <LabelledInput label="Username" placeholder="example@abc.com" type="email" onChange={(e) => {
                    setPostInputs(prev => ({
                        ...prev,
                        email: e.target.value
                    }))
                }} />
                <LabelledInput label="Password" type="password" placeholder="" onChange={(e) => {
                    setPostInputs(prev => ({
                        ...prev,
                        password: e.target.value
                    }))
                }} />

                <button type="button" onClick={sendRequest} className="text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>
        </div>
    )
}

export default Auth
