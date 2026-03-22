import z from "zod";

export const CreateRoleSchema = z.object({
    role_name: z.string(), 
    role_scope: z.enum([
        "base", 
        "both", 
        "extension"
    ]),
});

export const RoleSchema = CreateRoleSchema.extend({
    role_id: z.number(),
});

type BaseRole = "student" | "teacher" | "admin";
type ExtendedRole = "student" | "teacher" | "cr" | "iic";

export type Role = z.infer<typeof RoleSchema>;
export type CreateRole = z.infer<typeof CreateRoleSchema>;
export type RoleMap = Record<BaseRole | ExtendedRole, number>;
