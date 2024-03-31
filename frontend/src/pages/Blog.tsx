import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog"
import Appbar from "../components/Appbar"
import Skeleton from "../components/Skeleton"

const Blog = () => {
  const { id } = useParams()
  const { loading, blog } = useBlog({ id: id || "" })

  if (loading) {
    return (
      <Skeleton />
    )
  }
  
  return (
    <div>
      <Appbar />
      <div className="px-8">
        {blog && <FullBlog blog={blog} />}
      </div>
    </div>
  )
}

export default Blog
