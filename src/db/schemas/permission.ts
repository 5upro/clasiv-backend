import { pgTable, serial, text, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const permissions = pgTable("permissions", {
	id: serial().primaryKey().notNull(),
	action: text().notNull(),
	resource: text().notNull(),
}, (table) => [
	check("permissions_action_check", sql`action = ANY (ARRAY['manage'::text, 'create'::text, 'update'::text, 'read'::text, 'delete'::text])`),
]);
