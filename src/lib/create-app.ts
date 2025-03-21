/**
 * Purpose: Create the application instance.
 * This file is responsible for creating the application instance.
 * It uses the hono library to create the application instance.
 * Setup the application instance with the necessary middlewares and error handlers.
 */

import type { Schema } from "hono"

import { OpenAPIHono } from "@hono/zod-openapi"
import { requestId } from "hono/request-id"

import type { AppBindings, AppOpenAPI } from "@/lib/types.js"

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
  app.use(requestId())
    .use(pinoLogger())
    .use(serveEmojiFavicon("🔥"))

  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/", router)
}
