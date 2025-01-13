import { OpenAPIHono } from "@hono/zod-openapi"
import { env } from "hono/adapter"
import { requestId } from "hono/request-id"

import type { AppBindings } from "./lib/types.js"

import { notFound, onError, pinoLogger } from "./middlewares/index.js"

const app = new OpenAPIHono<AppBindings>()

app.use("*", requestId())
app.use(pinoLogger())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.get("/env", (c) => {
  const e = env(c)
  c.var.logger.info(`NODE VERSION: ${e.NODE_ENV}`)
  return c.json(e)
})

app.notFound(notFound)

app.onError(onError)

export default app
