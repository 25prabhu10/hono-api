import { serve } from "@hono/node-server"

import app from "./app.js"

const port = 3000

serve({
  fetch: app.fetch,
  port,
})
