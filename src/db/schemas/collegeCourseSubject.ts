import { pgTable, foreignKey, uuid, boolean, unique } from "drizzle-orm/pg-core";
import { colleges } from "./college";
import { courseSubjects } from "./courseSubject";

export const collegeCourseSubjects = pgTable("college_course_subjects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	collegeId: uuid("college_id").notNull(),
	courseSubjectId: uuid("course_subject_id").notNull(),
	isActive: boolean("is_active").default(true),
}, (table) => [
	foreignKey({
		columns: [table.collegeId],
		foreignColumns: [colleges.id],
		name: "college_course_subjects_college_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.courseSubjectId],
		foreignColumns: [courseSubjects.id],
		name: "college_course_subjects_course_subject_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	unique("college_course_subjects_college_id_course_subject_id_key").on(table.collegeId, table.courseSubjectId),
]);
