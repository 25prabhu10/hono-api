import { createRoute } from "@hono/zod-openapi"

import { createRouter } from "@/lib/create-app.js"
import { OK } from "@/lib/http-status-codes.js"
import { jsonContent } from "@/openapi/helpers/index.js"
import createMessageObjectSchema from "@/openapi/schemas/create-message-object.js"

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [OK]: jsonContent(
          createMessageObjectSchema("Tasks API"),
          "Tasks API Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Tasks API",
      }, OK)
    },
  )

export default router
