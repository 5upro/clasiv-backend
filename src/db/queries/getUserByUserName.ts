import db from "@/config/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const getUserByUserName = async (userName: string) => {
	const result = await db
		.select()
		.from(users)
		.where(eq(users.userName, userName))
        .limit(1);

	return result[0] ?? null;
};
