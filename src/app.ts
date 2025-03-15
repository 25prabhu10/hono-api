import configureOpenAPI from "@/lib/configure-open-api.js"
import createApp from "@/lib/create-app.js"
import index from "@/routes/index.route.js"
// Replace the following import with your application's routes
import tasks from "@/routes/tasks/tasks.index.js"

// Create an app instance
const app = createApp()

// Configure OpenAPI
configureOpenAPI(app)

// Define routes
// Replace "tasks" with your application's routes
const routes = [index, tasks] as const

// Register routes
routes.forEach((route) => {
  app.route("/", route)
})

// Export the app type for route definitions
export type AppType = typeof routes[number]

// Export the app instance
export default app
