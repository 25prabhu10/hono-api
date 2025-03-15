/**
 * Purpose: Create the application instance.
 * This file is responsible for creating the application instance.
 * It uses the hono library to create the application instance.
 * Setup the application instance with the necessary middlewares and error handlers.
 */

import { OpenAPIHono } from "@hono/zod-openapi"
import { requestId } from "hono/request-id"

import type { AppBindings } from "@/lib/types.js"

import { notFound, onError, pinoLogger, serveEmojiFavicon } from "@/middlewares/index.js"
import { defaultHook } from "@/openapi/index.js"

export function createRouter() {
  return new OpenAPIHono<AppBindings>(
    {
      defaultHook,
    },
  )
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
