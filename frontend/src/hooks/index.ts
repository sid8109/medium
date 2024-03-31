import { useEffect, useState } from "react"
import axios from "axios"
import BACKEND_URL from "../../config"

export interface BlogType {
    title: string,
    content: string,
    id: string,
    author: {
        name: string
    }
}

export const useBlog = ({id} : {id: string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<BlogType>()

    useEffect(() => {
        setLoading(true)
        async function fetchBlog() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setBlog(response.data.post)
                setLoading(false)
            } catch(e) {
                console.log("Failed to fetch blog")
            }
            setLoading(false)
        }

        fetchBlog()
    }, [])

    return {
        loading, 
        blog   
    }
}

const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogType[]>([])

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setBlogs(response.data.posts)
                setLoading(false)
            } catch(e) {
                console.log("Failed to fetch blogs")
            }
            setLoading(false)
        }

        fetchBlogs()
    }, [])

    return {
        loading, 
        blogs   
    }
}

export default useBlogs
