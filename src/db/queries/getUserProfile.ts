import db from "@/config/db";
import { UserProfileSchema, type UserProfile } from "@/types/users";
import { sql } from "drizzle-orm";

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
	const result = await db.execute(sql`
		select get_user_profile(
			${userId}
		);
	`);
	const raw = result.rows[0]?.get_user_profile;
	return UserProfileSchema.parse(raw);
}
