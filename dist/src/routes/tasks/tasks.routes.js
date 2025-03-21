import { createRoute, z } from "@hono/zod-openapi";
import { insertTasksSchema, selectTasksSchema } from "@/db/schema.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers/index.js";
import { createErrorSchema } from "@/openapi/schemas/index.js";
const tags = ["Tasks"];
const path = "/tasks";
export const getAllTasks = createRoute({
    tags,
    path,
    method: "get",
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), "The list of tasks"),
    },
});
export const createTask = createRoute({
    path,
    method: "post",
    request: {
        body: jsonContentRequired(insertTasksSchema, "The task to create"),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The created task"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertTasksSchema), "The validation error(s)"),
    },
});
