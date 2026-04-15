import { 
	pgTable, 
	text, 
	foreignKey, 
	uuid, 
	primaryKey } 
from "drizzle-orm/pg-core";
import { subjects } from "./subject";
import { teachers } from "./teacher";

export const teacherSubjects = pgTable("teacher_subjects", {
	subjectCode: text("subject_code").notNull(),
	subjectName: text("subject_name").notNull(),
	teacherId: uuid("teacher_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.subjectCode, table.subjectName],
			foreignColumns: [subjects.code, subjects.name],
			name: "teacher_subjects_subject_code_subject_name_fkey"
		}),
	foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.userId],
			name: "teacher_subjects_teacher_id_fkey"
		}),
	primaryKey({ columns: [table.subjectCode, table.subjectName, table.teacherId], name: "teacher_subjects_pkey"}),
]);
