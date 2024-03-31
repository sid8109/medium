import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@sid_81/common'

export const userRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string,
    },
    Variables: {
        prisma: any
    }
}>()

userRouter.post("/signup", async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)
    if(!success) {
        c.status(400)
        return c.json({error: "Invalid input!"})
    }

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name.trim(),
                email: body.email.trim(),
                password: body.password,
            },
        })
        const token = await sign({id: user.id}, c.env.JWT_SECRET)
        return c.json({jwt: token})
    } catch(e) {
        c.status(403)
        return c.json({error: "Error while signin up!"})
    }
})

userRouter.post("/signin", async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body)
    if(!success) {
        c.status(400)
        return c.json({error: "Invalid input!"})
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        }
    })

    if(!user) {
        c.status(403)
        return c.json({error: "User not found!"})
    }

    const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({jwt})
})