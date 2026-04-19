import { pgTable, foreignKey, uuid, text, smallint, timestamp, inet, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";

export const otpSessions = pgTable("otp_sessions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	emailId: text("email_id").notNull(),
	purpose: text().notNull(),
	otpHash: text("otp_hash").notNull(),
	status: text().default('pending'),
	otpAttempts: smallint("otp_attempts").default(0),
	maxOtpAttempts: smallint("max_otp_attempts").default(5),
	resendCount: smallint("resend_count").default(0),
	maxResend: smallint("max_resend").default(3),
	changeEmailCount: smallint("change_email_count").default(0),
	maxEmailChange: smallint("max_email_change").default(3),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).default(sql`(now() + '00:03:00'::interval)`),
	ip: inet(),
	userAgent: text("user_agent"),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [users.id],
		name: "otp_sessions_user_id_fkey"
	}),
	check("otp_sessions_purpose_check", sql`purpose = ANY (ARRAY['email_verification'::text, 'password_reset'::text, 'email_change'::text])`),
	check("otp_sessions_status_check", sql`status = ANY (ARRAY['pending'::text, 'used'::text, 'expired'::text])`),
]);
