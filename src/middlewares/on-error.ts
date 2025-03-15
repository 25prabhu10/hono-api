// Purpose: Handle errors in the application.

import type { ErrorHandler } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"

import parsedEnv from "@/lib/env.js"
import { INTERNAL_SERVER_ERROR, OK } from "@/lib/http-status-codes.js"

// Error handler
const onError: ErrorHandler = (err, c) => {
  // Get the status code from the error object
  // or use the default status code from the response object
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status

  // Set the status code to the error status code
  // or use INTERNAL_SERVER_ERROR as the default status code
  const statusCode = currentStatus !== OK
    ? (currentStatus as ContentfulStatusCode)
    : INTERNAL_SERVER_ERROR

  // Get the environment from the request object
  // to show the stack trace only in development mode
  const env = c.env?.NODE_ENV || parsedEnv?.NODE_ENV
  return c.json(
    {
      message: err.message,
      stack: env === "production"
        ? undefined
        : err.stack,
    },
    statusCode,
  )
}

export default onError
