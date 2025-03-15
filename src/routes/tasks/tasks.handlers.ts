import type { AppRouteHandler } from "@/lib/types.js"
import type { CreateRoute, GetAllTasksRoute } from "@/routes/tasks/tasks.routes.js"

import db from "@/db/index.js"
import { tasksTable } from "@/db/schema.js"
import * as HttpStatusCodes from "@/lib/http-status-codes.js"

export const getAllListHandler: AppRouteHandler<GetAllTasksRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany()
  return c.json(tasks)
}

export const createTaskHandler: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json")
  const [inserted] = await db.insert(tasksTable).values(task).returning()
  return c.json(inserted, HttpStatusCodes.OK)
}
