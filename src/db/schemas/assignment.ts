import { pgTable, foreignKey, uuid, text, smallint, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { collegeCourseSubjects } from "./collegeCourseSubject";

export const assignments = pgTable("assignments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	assignedBy: uuid("assigned_by"),
	collegeCourseSubjectId: uuid("college_course_subject_id").notNull(),
	maxMarks: smallint("max_marks"),
	attachmentUrl: text("attachment_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	dueAt: timestamp("due_at", { withTimezone: true, mode: 'string' }).notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
	filePattern: smallint("file_pattern").array().default([2]).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.assignedBy],
			foreignColumns: [users.id],
			name: "assignments_assigned_by_fkey"
		}),
	foreignKey({
			columns: [table.collegeCourseSubjectId],
			foreignColumns: [collegeCourseSubjects.id],
			name: "assignments_college_course_subject_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

