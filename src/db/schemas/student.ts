import { 
	pgTable, 
	text, 
	foreignKey, 
	unique, 
	uuid, 
	smallint, 
	date 
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { semesters } from "./semester";

export const students = pgTable("students", {
	userId: uuid("user_id").primaryKey().notNull(),
	rollNo: text("roll_no").notNull(),
	regNo: text("reg_no").notNull(),
	dob: date(),
	semesterId: smallint("semester_id").notNull(),
	courseId: uuid("course_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.semesterId, table.courseId],
			foreignColumns: [semesters.id, semesters.courseId],
			name: "fk_semester"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "students_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("students_roll_no_key").on(table.rollNo),
	unique("students_reg_no_key").on(table.regNo),
]);

