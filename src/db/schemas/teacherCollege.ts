import { pgTable, foreignKey, uuid, primaryKey } from "drizzle-orm/pg-core";
import { colleges } from "./college";
import { teachers } from "./teacher";

export const teacherColleges = pgTable("teacher_colleges", {
	teacherId: uuid("teacher_id").notNull(),
	collegeId: uuid("college_id").notNull(),
}, (table) => [
	foreignKey({
		columns: [table.collegeId],
		foreignColumns: [colleges.id],
		name: "teacher_colleges_college_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.teacherId],
		foreignColumns: [teachers.userId],
		name: "teacher_colleges_teacher_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.teacherId, table.collegeId], name: "teacher_colleges_pkey" }),
]);
