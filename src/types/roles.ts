import { z } from "zod";

export const BaseRoleEnum = z.enum([
	"student", 
	"teacher", 
	"admin"
]);

export const ExtendedRoleEnum = z.enum([
	"student", 
	"teacher", 
	"cr", 
	"iic"
]);

export const RoleScope = z.enum([
	"base", 
	"both", 
	"extension"
]);

export const CreateRoleSchema = z.object({
    role_name: z.string(), 
    role_scope: RoleScope,
});

export const RoleSchema = CreateRoleSchema.extend({
    role_id: z.number(),
});

export type Role = z.infer<typeof RoleSchema>;
export type CreateRole = z.infer<typeof CreateRoleSchema>;
export type BaseRole = z.infer<typeof BaseRoleEnum>;
export type ExtendedRole = z.infer<typeof ExtendedRoleEnum>;
export type RoleMap = Record<BaseRole | ExtendedRole, number>;
