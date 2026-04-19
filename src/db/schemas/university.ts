import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const universities = pgTable("universities", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	abbrv: text().notNull(),
});
