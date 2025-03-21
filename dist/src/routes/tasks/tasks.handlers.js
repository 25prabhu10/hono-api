import db from "@/db/index.js";
import { tasksTable } from "@/db/schema.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
export const getAllListHandler = async (c) => {
    const tasks = await db.query.tasksTable.findMany();
    return c.json(tasks);
};
export const createTaskHandler = async (c) => {
    const task = c.req.valid("json");
    const [inserted] = await db.insert(tasksTable).values(task).returning();
    return c.json(inserted, HttpStatusCodes.OK);
};
