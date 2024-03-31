import { BlogType } from "../hooks"
import Avatar from "./Avatar"

const FullBlog = ({ blog }: { blog: BlogType }) => {
    return (
        <div className="grid grid-cols-12 max-w-screen-xl pt-10 mx-auto gap-3">
            <div className="col-span-8">
                <div className="text-5xl font-bold">
                    {blog.title}
                </div>
                <div className="text-md text-gray-400 pt-2 ">
                    Published on 2nd December, 2023
                </div>
                <div className="pt-4 text-lg text-gray-700">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
                <p className="text-gray-800 font-semibold pb-3">Author</p>
                <div className="flex items-center gap-3">
                    <div>
                        <Avatar name={blog.author.name || "Anonymous" } size="big" />
                    </div>
                    <div>
                        <div className="font-bold text-xl">
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className="pt-1 text-gray-500">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, iure?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullBlog
