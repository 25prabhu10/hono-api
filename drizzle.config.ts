import { defineConfig } from "drizzle-kit"

import parsedEnv from "@/lib/env.js"

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: parsedEnv.DATABASE_URL,
  },
})
