import db from "@/config/db";
import { users } from "@/db/schemas/index";

export async function getUsers() {
    return await db.select().from(users);
}
