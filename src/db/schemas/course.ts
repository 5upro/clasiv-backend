import { 
	pgTable, 
	text, 
	foreignKey, 
	uuid 
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { departments } from "./department";
import { teachers } from "./teacher";

export const courses = pgTable("courses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	abbrv: text().notNull(),
	hodId: uuid("hod_id"),
	departmentId: uuid("department_id").default(sql`'aa0239e4-93d5-4231-a167-245487e2a2c2'`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [departments.id],
			name: "courses_department_id_fkey"
		}),
	foreignKey({
			columns: [table.hodId],
			foreignColumns: [teachers.userId],
			name: "departments_hod_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);
