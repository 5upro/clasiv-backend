import { z } from "zod";

export const RefreshTokenSchema = z.object({
	id: z.string(),
});

export const AccessTokenSchema = z.object({
	id: z.string(),
	role: z.string(),
	extended_roles: z.array(z.string()),
});

export const RegisterSchema = z.object({
    roll_no: z.string().min(11).max(11),
    email_id: z.string().email().toLowerCase(),
});

export const LoginSchema = z.object({
    email_id: z.string().email().toLowerCase(),
});

export type RefreshTokenPayload =	z.infer<typeof RefreshTokenSchema>;
export type AccessTokenPayload =	z.infer<typeof AccessTokenSchema>;
export type RegisterPayload =		z.infer<typeof RegisterSchema>;
export type LoginPayload =			z.infer<typeof LoginSchema>;
