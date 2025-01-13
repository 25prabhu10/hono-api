import { OpenAPIHono } from "@hono/zod-openapi"
import { requestId } from "hono/request-id"

import type { AppBindings } from "@/lib/types.js"

import { notFound, onError, pinoLogger, serveEmojiFavicon } from "@/middlewares/index.js"

export function createRouter() {
  return new OpenAPIHono<AppBindings>()
}

export default function createApp() {
  const app = createRouter()

  app.use("*", requestId())
  app.use(pinoLogger())

  app.use(serveEmojiFavicon("🔥"))

  app.notFound(notFound)
  app.onError(onError)
  return app
}
