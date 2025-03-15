import { createRouter } from "@/lib/create-app.js"
import * as handlers from "@/routes/tasks/tasks.handlers.js"
import * as routes from "@/routes/tasks/tasks.routes.js"

const router = createRouter()
  .openapi(routes.getAllTasks, handlers.getAllListHandler)
  .openapi(routes.createTask, handlers.createTaskHandler)

export default router
