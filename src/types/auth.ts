import { z } from "zod";

export const RefreshTokenSchema = z.object({
	id: z.string(),
});

export const AccessTokenSchema = z.object({
	id: z.string(),
	role: z.string(),
	extended_roles: z.array(z.string()),
});

export const ActivationSchema = z.object({
    user_name: z.string(),
    password: z.string(),
});

export const LoginSchema = z.union([
	z.object({
		user_name: z.string().toLowerCase(),
		password: z.string(),
	}),
	z.object({
		email_id: z.string().email().toLowerCase(),
		password: z.string(),
	}),
]);

export type RefreshTokenPayload =	z.infer<typeof RefreshTokenSchema>;
export type AccessTokenPayload =	z.infer<typeof AccessTokenSchema>;
export type ActivationPayload =		z.infer<typeof ActivationSchema>;
export type LoginPayload =			z.infer<typeof LoginSchema>;
