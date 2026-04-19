import { pgTable, foreignKey, uuid, boolean, primaryKey } from "drizzle-orm/pg-core";
import { departments } from "./department";
import { teachers } from "./teacher";

export const teacherDepartments = pgTable("teacher_departments", {
	teacherId: uuid("teacher_id").notNull(),
	departmentId: uuid("department_id").notNull(),
	isHod: boolean("is_hod").default(false),
}, (table) => [
	foreignKey({
		columns: [table.departmentId],
		foreignColumns: [departments.id],
		name: "teacher_departments_department_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.teacherId],
		foreignColumns: [teachers.userId],
		name: "teacher_departments_teacher_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.teacherId, table.departmentId], name: "teacher_departments_pkey" }),
]);
