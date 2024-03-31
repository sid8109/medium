import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-3">
            <div className="font-bold text-3xl cursor-pointer">
                <Link to="/blogs">
                    Medium
                </Link>
            </div>
            <div className="flex items-center">
                <Link to="/publish" >
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-5">Publish</button>
                </Link>
                <Avatar name="Siddharth Gogri" size="big" />
            </div>
        </div>
    )
}

export default Appbar
