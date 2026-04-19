import { pgTable, foreignKey, uuid, text } from "drizzle-orm/pg-core";
import { users } from "./user";

export const teachers = pgTable("teachers", {
	userId: uuid("user_id").primaryKey().notNull(),
	abbrv: text().notNull(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [users.id],
		name: "teachers_user_id_fkey"
	}).onUpdate("cascade").onDelete("cascade"),
]);
