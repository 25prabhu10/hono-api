/**
 * Purpose: Create a logger instance using pino.
 *
 * This file is responsible for creating a logger instance using the hono-pino library.
 */

import { pinoLogger as logger } from "hono-pino"
import { pino } from "pino"
import PinoPretty from "pino-pretty"

import parsedEnv from "@/lib/env.js"

export default function pinoLogger() {
  return logger({
    pino: pino({
      level: parsedEnv.LOG_LEVEL,
    }, parsedEnv.NODE_ENV === "production" ? undefined : PinoPretty()), // Pretty print logs in development mode
  })
}
