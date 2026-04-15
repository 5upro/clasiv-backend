import { 
	pgTable, 
	foreignKey, 
	integer, 
	smallint, 
	primaryKey 
} from "drizzle-orm/pg-core";
import { roles } from "./role";
import { permissions } from "./permission";

export const rolePermissions = pgTable("role_permissions", {
	roleId: smallint("role_id").notNull(),
	permissionId: integer("permission_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [permissions.id],
			name: "role_permissions_permission_id_fkey"
		}),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "role_permissions_role_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.roleId, table.permissionId], name: "role_permissions_pkey"}),
]);
