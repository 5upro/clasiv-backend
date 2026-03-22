import z from "zod";

export const RoleSchema = z.object({
    role_id: z.number(),
    role_name: z.enum([
		"admin", 
		"teacher", 
		"student", 
		"cr", 
		"iic"
	]),
	role_scope: z.enum([
		"base", 
		"both", 
		"extension"
	]),
});

type BaseRole = "student" | "teacher" | "admin";
type ExtendedRole = "student" | "teacher" | "cr" | "iic";

export type Role = z.infer<typeof RoleSchema>;
export type RoleMap = Record<BaseRole | ExtendedRole, number>;
