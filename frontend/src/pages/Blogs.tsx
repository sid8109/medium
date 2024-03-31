import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import useBlogs from "../hooks"
import Skeleton from "../components/Skeleton"

const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <Skeleton />
        )
    }

    return (
        <>
            <Appbar />
            <div className="px-6">
                <div className="max-w-2xl mx-auto">
                    {blogs.map(blog => <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="2021-09-21" />)}
                </div>
            </div>
        </>
    )
}

export default Blogs
