import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { DB_URL } from '../config';
import * as schema from "./schema";

const pool = new Pool({
  connectionString: DB_URL!,
});
const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema })
export { db }