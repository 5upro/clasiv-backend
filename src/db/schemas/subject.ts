import { 
	pgTable, 
	foreignKey, 
	text, 
	uuid, 
	smallint, 
	primaryKey 
} from "drizzle-orm/pg-core";
import { semesters } from "./semester";

export const subjects = pgTable("subjects", {
	code: text().notNull(),
	name: text().notNull(),
	courseId: uuid("course_id").notNull(),
	semesterId: smallint("semester_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseId, table.semesterId],
			foreignColumns: [semesters.id, semesters.courseId],
			name: "subjects_semester_id_course_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.code, table.name], name: "subjects_pkey"}),
]);

