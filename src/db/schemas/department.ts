import { pgTable, foreignKey, uuid, text, unique } from "drizzle-orm/pg-core";
import { universities } from "./university";

export const departments = pgTable("departments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	abbrv: text().notNull(),
	universityId: uuid("university_id").notNull(),
}, (table) => [
	foreignKey({
		columns: [table.universityId],
		foreignColumns: [universities.id],
		name: "departments_university_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	unique("departments_name_key").on(table.name),
	unique("departments_abbrv_key").on(table.abbrv),
]);
