import { 
	pgTable, 
	foreignKey, 
	uuid, 
	smallint, 
	primaryKey 
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { roles } from "./role";

export const roleExtendedUsers = pgTable("role_extended_users", {
	userId: uuid("user_id").notNull(),
	roleId: smallint("role_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "role_extended_users_role_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "role_extended_users_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.roleId], name: "role_extended_users_pkey"}),
]);
