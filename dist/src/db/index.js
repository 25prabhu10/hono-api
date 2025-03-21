/**
 * Purpose: Exports a database instance that is connected to the database specified in the DATABASE_URL environment variable.
 *
 * This file is responsible for creating a database instance using the drizzle-orm library.
 * It uses the schema module to define the database schema.
 */
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema.js";
import parsedEnv from "@/lib/env.js";
// Create a database instance
const db = drizzle(parsedEnv.DATABASE_URL, {
    schema,
});
export default db;
