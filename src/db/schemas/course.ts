import { pgTable, foreignKey, uuid, text, smallint, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { departments } from "./department";

export const courses = pgTable("courses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	abbrv: text().notNull(),
	departmentId: uuid("department_id").notNull(),
	maxSemesters: smallint("max_semesters").default(sql`'6'`).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.departmentId],
		foreignColumns: [departments.id],
		name: "courses_department_id_fkey"
	}),
	check("courses_max_semesters_check", sql`max_semesters > 0`),
]);
