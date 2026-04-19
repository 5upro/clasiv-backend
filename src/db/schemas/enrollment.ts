import { pgTable, foreignKey, uuid, smallint, text, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { collegeCourses } from "./collegeCourse";
import { departments } from "./department";
import { students } from "./student";
import { universities } from "./university";

export const enrollments = pgTable("enrollments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	studentId: uuid("student_id").notNull(),
	universityId: uuid("university_id").notNull(),
	departmentId: uuid("department_id").notNull(),
	collegeId: uuid("college_id").notNull(),
	courseId: uuid("course_id").notNull(),
	admissionYear: smallint("admission_year").notNull(),
	expectedGraduationYear: smallint("expected_graduation_year").generatedAlwaysAs(sql`(admission_year + 4)`),
	regNo: text("reg_no").default('N/A').notNull(),
	rollNo: text("roll_no").default('N/A').notNull(),
	currentSemester: smallint("current_semester").notNull(),
	section: text(),
	admissionType: text("admission_type").default('regular').notNull(),
	admissionMode: text("admission_mode").default('offline').notNull(),
	courseMode: text("course_mode").default('day').notNull(),
	status: text().default('active').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdBy: text("created_by"),
}, (table) => [
	foreignKey({
		columns: [table.collegeId, table.courseId],
		foreignColumns: [collegeCourses.collegeId, collegeCourses.courseId],
		name: "enrollments_college_id_course_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.departmentId],
		foreignColumns: [departments.id],
		name: "enrollments_department_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.studentId],
		foreignColumns: [students.userId],
		name: "enrollments_student_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
		columns: [table.universityId],
		foreignColumns: [universities.id],
		name: "enrollments_university_id_fkey"
	}).onUpdate("cascade").onDelete("restrict"),
	check("enrollments_admission_mode_check", sql`admission_mode = ANY (ARRAY['offline'::text, 'online'::text])`),
	check("enrollments_admission_type_check", sql`admission_type = ANY (ARRAY['regular'::text, 'lateral'::text, 'transfer'::text, 'distance'::text])`),
	check("enrollments_course_mode_check", sql`course_mode = ANY (ARRAY['day'::text, 'evening'::text])`),
	check("enrollments_current_semester_check", sql`current_semester > 0`),
	check("enrollments_status_check", sql`status = ANY (ARRAY['active'::text, 'dropped'::text, 'completed'::text, 'suspended'::text])`),
]);
