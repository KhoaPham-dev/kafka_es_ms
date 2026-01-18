import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './src/config';

export default defineConfig({
  out: './src/db/migration',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL!,
  }
})