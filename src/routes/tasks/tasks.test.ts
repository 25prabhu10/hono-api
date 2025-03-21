import { testClient } from "hono/testing"
import { expect, it } from "vitest"

import { createTestApp } from "@/lib/create-app"
import parsedEnv from "@/lib/env.js"

import router from "./tasks.index"

const client = testClient(createTestApp(router))

if (parsedEnv.NODE_ENV !== "test") {
  throw new Error("NODE_ENV must be 'test'")
}

describe("tasks routes", () => {
})
