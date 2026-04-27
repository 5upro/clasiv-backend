import db from "@/config/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const getUserById = async (id: string) => {
	const result = await db
		.select()
		.from(users)
		.where(eq(users.id, id))
		.limit(1);

	return result[0] ?? null;
};
