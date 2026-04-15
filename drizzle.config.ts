import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");

export default defineConfig({
	schema: "./src/db/schemas",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: DATABASE_URL,
	},
	strict: true,
    verbose: true,
});
