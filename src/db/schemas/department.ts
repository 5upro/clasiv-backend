import { 
	pgTable, 
	text, 
	unique, 
	uuid 
} from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	abbrv: text().notNull(),
}, (table) => [
	unique("departments_name_key").on(table.name),
	unique("departments_abbrv_key").on(table.abbrv),
]);

