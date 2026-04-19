import { pgTable, foreignKey, uuid, date } from "drizzle-orm/pg-core";
import { users } from "./user";

export const students = pgTable("students", {
	userId: uuid("user_id").primaryKey().notNull(),
	dob: date(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [users.id],
		name: "students_user_id_fkey"
	}).onUpdate("cascade").onDelete("cascade"),
]);
