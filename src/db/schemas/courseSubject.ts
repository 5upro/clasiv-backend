import { pgTable, foreignKey, uuid, smallint, unique } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { subjects } from "./subject";

export const courseSubjects = pgTable("course_subjects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	courseId: uuid("course_id").notNull(),
	subjectId: uuid("subject_id").notNull(),
	semester: smallint().notNull(),
}, (table) => [
	foreignKey({
		columns: [table.courseId],
		foreignColumns: [courses.id],
		name: "course_subjects_course_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.subjectId],
		foreignColumns: [subjects.id],
		name: "course_subjects_subject_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	unique("course_subjects_course_id_subject_id_semester_key").on(table.courseId, table.subjectId, table.semester),
]);
