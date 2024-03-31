import { ChangeEvent, useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios"
import BACKEND_URL from "../../config"
import { useNavigate } from "react-router-dom"

const Publish = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    return (
        <div>
            <Appbar />
            <div className="max-w-screen-lg mx-auto pt-10 px-10">
                <input type="text" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 mb-4" placeholder="Title" onChange={(e) => {
                    setTitle(e.target.value)
                }} />
                <TextArea onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4" onClick={async () => {
                    console.log(title, content)
                    const resposnse = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    navigate(`/blog/${resposnse.data.postId}`)
                }}>
                    Publish post
                </button>
            </div>
        </div>
    )
}

function TextArea({ onChange } : {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div className="bg-white mb-4">
            <label className="sr-only">Publish post</label>
            <textarea id="editor" rows={8} className="focus:outline-none p-3 block rounded-lg w-full text-md text-gray-800 bg-white border border-gray-300" placeholder="Write an article..." required onChange={onChange} />
        </div>
    )
}

export default Publish
