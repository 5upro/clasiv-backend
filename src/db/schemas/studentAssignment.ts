import { 
	pgTable, 
	check, 
	text, 
	foreignKey, 
	uuid, 
	timestamp, 
	primaryKey, 
	boolean 
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { assignments } from "./assignment";
import { students } from "./student";

export const studentAssignments = pgTable("student_assignments", {
	assignmentId: uuid("assignment_id").notNull(),
	studentId: uuid("student_id").notNull(),
	status: text().default('pending').notNull(),
	submittedAt: timestamp("submitted_at", { withTimezone: true, mode: 'string' }),
	isLate: boolean("is_late").default(false).notNull(),
	attachmentKey: text("attachment_key"),
}, (table) => [
	foreignKey({
			columns: [table.assignmentId],
			foreignColumns: [assignments.id],
			name: "student_assignments_assignment_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.userId],
			name: "student_assignments_student_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.assignmentId, table.studentId], name: "student_assignments_pkey"}),
	check("student_assignments_status_check", sql`status = ANY (ARRAY['pending'::text, 'submitted'::text])`),
]);
