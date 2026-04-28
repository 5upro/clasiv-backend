import { z } from "zod";

export const OtpPurposeEnum = z.enum(['email_verification', 'password_reset', 'email_change']);
export const OtpStatusEnum = z.enum(['pending', 'used', 'expired']);

const OtpSessionSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	emailId: z.string().email(),
	purpose: OtpPurposeEnum,
	otpHash: z.string(),
	status: OtpStatusEnum.default('pending'),
	otpAttempts: z.number().default(0),
	maxOtpAttempts: z.number().default(5),
	resendCount: z.number().default(0),
	maxResend: z.number().default(3),
	changeEmailCount: z.number().default(0),
	maxEmailChange: z.number().default(3),
	createdAt: z.string().nullable(),
	updatedAt: z.string().nullable(),
	expiresAt: z.string().nullable(),
	ip: z.string().nullable(),
	userAgent: z.string().nullable(),
});

export const CreateOtpSessionSchema = OtpSessionSchema.pick({
	userId: true,
	emailId: true,
	purpose: true,
	otpHash: true,
	ip: true,
	userAgent: true,
});

export const UpdateOtpSessionSchema = OtpSessionSchema.pick({
    otpHash: true,
	status: true,
	emailId: true,
	otpAttempts: true,
	resendCount: true,
	changeEmailCount: true,
	updatedAt: true,
	expiresAt: true,
}).partial();

export const DeleteOtpSessionSchema = OtpSessionSchema.pick({
	id: true,
});

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
});

export type OtpSession				= z.infer<typeof OtpSessionSchema>;
export type CreateOtpSession		= z.infer<typeof CreateOtpSessionSchema>;
export type UpdateOtpSession		= z.infer<typeof UpdateOtpSessionSchema>;
export type DeleteOtpSession		= z.infer<typeof DeleteOtpSessionSchema>;
export type OtpVerifyPayload		= z.infer<typeof OtpVerifyPayloadSchema>;
export type OtpResendPayload		= z.infer<typeof OtpResendPayloadSchema>;
export type OtpChangeEmailPayload	= z.infer<typeof OtpChangeEmailPayloadSchema>;
