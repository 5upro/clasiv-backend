import { 
	pgTable, 
	foreignKey, 
	uuid, 
	primaryKey 
} from "drizzle-orm/pg-core";
import { departments } from "./department";
import { teachers } from "./teacher";

export const teacherDepartments = pgTable("teacher_departments", {
	teacherId: uuid("teacher_id").notNull(),
	departmentId: uuid("department_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [departments.id],
			name: "teacher_departments_department_id_fkey"
		}),
	foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.userId],
			name: "teacher_departments_teacher_id_fkey"
		}),
	primaryKey({ columns: [table.teacherId, table.departmentId], name: "teacher_departments_pkey"}),
]);
