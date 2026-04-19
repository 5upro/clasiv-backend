import { pgTable, foreignKey, uuid, primaryKey } from "drizzle-orm/pg-core";
import { collegeCourseSubjects } from "./collegeCourseSubject";
import { teachers } from "./teacher";

export const teacherSubjects = pgTable("teacher_subjects", {
	teacherId: uuid("teacher_id").notNull(),
	collegeCourseSubjectId: uuid("college_course_subject_id").notNull(),
}, (table) => [
	foreignKey({
		columns: [table.collegeCourseSubjectId],
		foreignColumns: [collegeCourseSubjects.id],
		name: "teacher_subjects_college_course_subject_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.teacherId],
		foreignColumns: [teachers.userId],
		name: "teacher_subjects_teacher_id_fkey"
	}),
	primaryKey({ columns: [table.teacherId, table.collegeCourseSubjectId], name: "teacher_subjects_pkey" }),
]);
