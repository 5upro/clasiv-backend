import { pgTable, smallint, text, unique } from "drizzle-orm/pg-core";

export const filePatternChunks = pgTable("file_pattern_chunks", {
	id: smallint().primaryKey().generatedAlwaysAsIdentity({ name: "file_pattern_chunks_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 32767, cache: 1 }),
	name: text().notNull(),
	token: text().notNull(),
}, (table) => [
	unique("file_pattern_chunks_name_key").on(table.name),
	unique("file_pattern_chunks_token_key").on(table.token),
]);

