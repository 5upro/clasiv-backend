import db from "@/config/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getUserByFullName(fullName: string) {
  return await db
    .select()
    .from(users)
    .where(eq(users.fullName, fullName));
}
