/**
 * Purpose: Parse and validate environment variables.
 *
 * This file is responsible for parsing and validating the environment variables.
 * It uses the zod library for this purpose.
 * This helps to ensure that the environment variables are correctly set before the application starts.
 * The parsed environment variables are exported for use in other parts of the application.
 */

import { z } from "zod"

// Schema for the environment variables
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().max(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "string",
      received: "undefined",
      path: ["DATABASE_AUTH_TOKEN"],
      message: "Must be set when NODE_ENV is 'production'",
    })
  }
})

export type envType = z.infer<typeof EnvSchema>

// eslint-disable-next-line node/no-process-env
const { data: parsedEnv, error } = EnvSchema.safeParse(process.env)

if (error) {
  console.error("❌ Invalid env:")
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

export default parsedEnv!
