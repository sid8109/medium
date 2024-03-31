import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { postRouter } from './routes/post'
import { cors } from 'hono/cors'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    },
    Variables: {
        prisma: any
    }
}>()

app.use("/*", cors())

app.use("/*", async (c, next) => {
	const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set('prisma', prisma);
  await next()
})

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", postRouter)

export default app