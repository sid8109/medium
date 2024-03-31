import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@sid_81/common";

export const postRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
    },
    Variables: {
        authorId: string,
        prisma: any,
    }
}>();

postRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || ""
    if (!header) {
        c.status(401)
        return c.json({ error: "Unauthorized" })
    }

    try {
        const token = header.split(" ")[1]
        const response = await verify(token, c.env.JWT_SECRET)
        if (!response.id) {
            c.status(403)
            return c.json({ error: "Unauthorized" })
        }

        c.set("authorId", response.id)
        await next()
    } catch (e) {
        c.status(403)
        return c.json({ error: "Unauthorized" })
    }
})

postRouter.post("/", async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: "Invalid input!" })
    }

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("authorId")
        }
    })
    return c.json({ postId: post.id })
})

postRouter.put("/", async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: "Invalid input!" })
    }

    await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({ postId: body.id })
})

//pagination
postRouter.get("/bulk", async (c) => {
    const prisma = c.get("prisma")
    const posts = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({ posts })
})

postRouter.get("/:id", async (c) => {
    const prisma = c.get("prisma")
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: c.req.param("id")
            },
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ post })
    } catch (e) {
        c.status(404)
        return c.json({ error: "Blog not found" })
    }
})