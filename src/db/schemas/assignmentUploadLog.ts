import { pgTable, foreignKey, uuid, text, timestamp, bigint, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { assignments } from "./assignment";
import { students } from "./student";

export const assignmentUploadLogs = pgTable("assignment_upload_logs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	assignmentId: uuid("assignment_id").notNull(),
	studentId: uuid("student_id").notNull(),
	attachmentKey: text("attachment_key").notNull(),
	uploadedAt: timestamp("uploaded_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	uploadCompletedAt: timestamp("upload_completed_at", { withTimezone: true, mode: 'string' }),
	status: text().default('processing').notNull(),
	fileSize: bigint("file_size", { mode: "number" }),
	etag: text(),
}, (table) => [
	foreignKey({
		columns: [table.assignmentId],
		foreignColumns: [assignments.id],
		name: "assignment_upload_logs_assignment_id_fkey"
	}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
		columns: [table.studentId],
		foreignColumns: [students.userId],
		name: "assignment_upload_logs_student_id_fkey"
	}).onUpdate("cascade").onDelete("cascade"),
	check("assignment_upload_logs_status_check", sql`status = ANY (ARRAY['success'::text, 'processing'::text, 'failed'::text])`),
]);
