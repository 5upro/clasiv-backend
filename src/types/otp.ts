import { z } from "zod";

export const OtpSessionSchema = z.object({
	id: z.string().uuid(),
	user_id: z.string().uuid(),
	email_id: z.string().email(),
	purpose: z.enum(["register", "login"]),
	otp_hash: z.string(),
	status: z.enum(["pending", "used", "expired"]).default("pending"),
	otp_attempts: z.number().int().nonnegative(),
	max_otp_attempts: z.number().int().positive().default(5),
	resend_count: z.number().int().nonnegative(),
	max_resend: z.number().int().positive().default(3),
	change_email_count: z.number().int().nonnegative(),
	max_email_change: z.number().int().positive().default(3),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
	expires_at: z.coerce.date(),
	ip: z.string().nullable().optional(),
	user_agent: z.string().nullable().optional(),
});

export const OtpSessionWithUserSchema = OtpSessionSchema.extend({
    users: z.object({
        full_name: z.string(),
    }),
});

export const CreateOtpSessionSchema = z.object({
	user_id: z.string().uuid(),
	email_id: z.string().email(),
	value: z.string(),
	type: z.enum(["register", "login"]),
});

export const UpdateOtpSessionSchema = OtpSessionSchema.omit({
	id: true,
	user_id: true,
	purpose: true,
	max_otp_attempts: true,
	max_resend: true,
	max_email_change: true,
	created_at: true,
	ip: true,
	user_agent: true
}).partial();

export const OtpVerifyPayloadSchema = z.object({
	session_id: z.string().uuid(),
	value: z.string(),
});

export const OtpResendPayloadSchema = z.object({
	session_id: z.string().uuid(),
});

export const OtpChangeEmailPayloadSchema = z.object({
	session_id: z.string().uuid(),
	email_id: z.string().email().toLowerCase(),
})

export type OtpSession =			z.infer<typeof OtpSessionSchema>;
export type OtpSessionWithUser =	z.infer<typeof OtpSessionWithUserSchema>;
export type CreateOtpSession =		z.infer<typeof CreateOtpSessionSchema>;
export type UpdateOtpSession =		z.infer<typeof UpdateOtpSessionSchema>;
export type OtpVerifyPayload =		z.infer<typeof OtpVerifyPayloadSchema>;
export type OtpResendPayload =		z.infer<typeof OtpResendPayloadSchema>;
export type OtpChangeEmailPayload = z.infer<typeof OtpChangeEmailPayloadSchema>;
