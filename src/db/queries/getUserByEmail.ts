import db from "@/config/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getUserByEmail(emailId: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(users.emailId, emailId))
		.limit(1);

	return result[0] ?? null;
}
