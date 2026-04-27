import { 
	pgTable, 
	foreignKey, 
	uuid, 
	timestamp 
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";
import { otpSessions } from "./otpSession";
import { activationStatus } from "./activationStatus";

export const activationSessions = pgTable("activation_sessions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	otpSessionId: uuid("otp_session_id"),
	status: activationStatus().default('initiated').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).default(sql`(now() + '00:30:00'::interval)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.otpSessionId],
			foreignColumns: [otpSessions.id],
			name: "activation_sessions_otp_session_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "activation_sessions_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

