import { pinoLogger as logger } from "hono-pino"
import { pino } from "pino"
import PinoPretty from "pino-pretty"

import parsedEnv from "@/lib/env.js"

export default function pinoLogger() {
  return logger({
    pino: pino({
      level: parsedEnv.LOG_LEVEL,
    }, parsedEnv.NODE_ENV === "production" ? undefined : PinoPretty()),
  })
}
