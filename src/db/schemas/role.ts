import { pgTable, smallint, text, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const roles = pgTable("roles", {
	id: smallint().primaryKey().generatedByDefaultAsIdentity({ name: "roles_role_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 32767, cache: 1 }),
	name: text().notNull(),
	scope: text().notNull(),
}, (table) => [
	check("roles_role_scope_check", sql`scope = ANY (ARRAY['base'::text, 'extension'::text, 'both'::text])`),
]);
