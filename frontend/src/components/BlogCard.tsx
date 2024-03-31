import Avatar from "./Avatar"
import { Link } from "react-router-dom"

interface BlogCardType {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardType) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b py-5 px-1 cursor-pointer">
                <div className="flex items-center mb-2">
                    <Avatar name={authorName} size="small" />
                    <div className="pl-2 text-sm font-bold">
                        {authorName}
                    </div>
                    <div className="pl-2 text-sm text-gray-400">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-bold">
                    {title}
                </div>
                <div className="text-md">
                    {content.length > 150 ? content.slice(0, 150) + '...' : content}
                </div>
                <div className="text-sm font-light text-gray-500 pt-3">
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
