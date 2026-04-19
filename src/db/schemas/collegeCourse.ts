import { pgTable, foreignKey, uuid, primaryKey } from "drizzle-orm/pg-core";
import { colleges } from "./college";
import { courses } from "./course";

export const collegeCourses = pgTable("college_courses", {
	collegeId: uuid("college_id").notNull(),
	courseId: uuid("course_id").notNull(),
}, (table) => [
	foreignKey({
		columns: [table.collegeId],
		foreignColumns: [colleges.id],
		name: "college_courses_college_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.courseId],
		foreignColumns: [courses.id],
		name: "college_courses_course_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.collegeId, table.courseId], name: "college_courses_pkey" }),
]);
