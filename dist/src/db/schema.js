// Purpose: Define the schema for the tasks table.
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
export const tasksTable = sqliteTable("tasks", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    done: int({ mode: "boolean" }).notNull().default(false),
    createdAt: int("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date()),
    updatedAt: int("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});
export const selectTasksSchema = createSelectSchema(tasksTable);
export const insertTasksSchema = createInsertSchema(tasksTable, {
    name: schema => schema.min(1).max(500),
}).required({
    done: true,
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const patchTasksSchema = insertTasksSchema.partial();
