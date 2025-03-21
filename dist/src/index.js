import { serve } from "@hono/node-server";
import app from "@/app.js";
import parsedEnv from "@/lib/env.js";
// Create a HTTP server on the specified port
serve({
    fetch: app.fetch,
    port: parsedEnv.PORT,
});
