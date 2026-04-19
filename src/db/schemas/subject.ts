import { pgTable, uuid, text, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const subjects = pgTable("subjects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: text().notNull(),
	name: text().notNull(),
	scope: text().default('university').notNull(),
}, (table) => [
	check("subjects_scope_check", sql`scope = ANY (ARRAY['university'::text, 'college'::text])`),
]);
