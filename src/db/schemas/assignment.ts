import { 
	pgTable, 
	text, 
	foreignKey, 
	uuid, 
	timestamp, 
	smallint 
} from "drizzle-orm/pg-core";
import { semesters } from "./semester";
import { users } from "./user";
import { subjects } from "./subject";

export const assignments = pgTable("assignments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	assignedBy: uuid("assigned_by"),
	semesterId: smallint("semester_id").notNull(),
	courseId: uuid("course_id").notNull(),
	subjectCode: text("subject_code").notNull(),
	subjectName: text("subject_name").notNull(),
	maxMarks: smallint("max_marks"),
	attachmentUrl: text("attachment_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	dueAt: timestamp("due_at", { withTimezone: true, mode: 'string' }).notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.assignedBy],
			foreignColumns: [users.id],
			name: "assignments_assigned_by_fkey"
		}),
	foreignKey({
			columns: [table.semesterId, table.courseId],
			foreignColumns: [semesters.id, semesters.courseId],
			name: "assignments_semester_id_course_id_fkey"
		}),
	foreignKey({
			columns: [table.subjectCode, table.subjectName],
			foreignColumns: [subjects.code, subjects.name],
			name: "assignments_subject_code_subject_name_fkey"
		}),
]);

