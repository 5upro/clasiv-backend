import { 
	pgTable, 
	foreignKey, 
	uuid, 
	smallint, 
	primaryKey 
} from "drizzle-orm/pg-core";
import { courses } from "./course";

export const semesters = pgTable("semesters", {
	id: smallint().notNull(),
	courseId: uuid("course_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "semesters_course_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.id, table.courseId], name: "semesters_pkey"}),
]);
