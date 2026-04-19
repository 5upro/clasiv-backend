import { pgTable, foreignKey, uuid, text, boolean } from "drizzle-orm/pg-core";
import { universities } from "./university";

export const colleges = pgTable("colleges", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	abbrv: text().notNull(),
	universityId: uuid("university_id").notNull(),
	isMainCampus: boolean("is_main_campus").default(false).notNull(),
	isAutonomous: boolean("is_autonomous").default(false).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.universityId],
		foreignColumns: [universities.id],
		name: "colleges_university_id_fkey"
	}),
]);
