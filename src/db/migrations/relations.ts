import { relations } from "drizzle-orm/relations";
import { roles, users, departments, courses, teachers, assignments, assignmentUploadLogs, students, semesters, subjects, otpSessions, permissions, rolePermissions, roleExtendedUsers, teacherDepartments, teacherSubjects, studentAssignments } from "./schema";

export const usersRelations = relations(users, ({one, many}) => ({
	role: one(roles, {
		fields: [users.baseRole],
		references: [roles.id]
	}),
	teachers: many(teachers),
	students: many(students),
	assignments: many(assignments),
	otpSessions: many(otpSessions),
	roleExtendedUsers: many(roleExtendedUsers),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users: many(users),
	rolePermissions: many(rolePermissions),
	roleExtendedUsers: many(roleExtendedUsers),
}));

export const coursesRelations = relations(courses, ({one, many}) => ({
	department: one(departments, {
		fields: [courses.departmentId],
		references: [departments.id]
	}),
	teacher: one(teachers, {
		fields: [courses.hodId],
		references: [teachers.userId]
	}),
	semesters: many(semesters),
}));

export const departmentsRelations = relations(departments, ({many}) => ({
	courses: many(courses),
	teacherDepartments: many(teacherDepartments),
}));

export const teachersRelations = relations(teachers, ({one, many}) => ({
	courses: many(courses),
	user: one(users, {
		fields: [teachers.userId],
		references: [users.id]
	}),
	teacherDepartments: many(teacherDepartments),
	teacherSubjects: many(teacherSubjects),
}));

export const assignmentUploadLogsRelations = relations(assignmentUploadLogs, ({one}) => ({
	assignment: one(assignments, {
		fields: [assignmentUploadLogs.assignmentId],
		references: [assignments.id]
	}),
	student: one(students, {
		fields: [assignmentUploadLogs.studentId],
		references: [students.userId]
	}),
}));

export const assignmentsRelations = relations(assignments, ({one, many}) => ({
	assignmentUploadLogs: many(assignmentUploadLogs),
	user: one(users, {
		fields: [assignments.assignedBy],
		references: [users.id]
	}),
	semester: one(semesters, {
		fields: [assignments.semesterId],
		references: [semesters.id]
	}),
	subject: one(subjects, {
		fields: [assignments.subjectCode],
		references: [subjects.code]
	}),
	studentAssignments: many(studentAssignments),
}));

export const studentsRelations = relations(students, ({one, many}) => ({
	assignmentUploadLogs: many(assignmentUploadLogs),
	semester: one(semesters, {
		fields: [students.semesterId],
		references: [semesters.id]
	}),
	user: one(users, {
		fields: [students.userId],
		references: [users.id]
	}),
	studentAssignments: many(studentAssignments),
}));

export const semestersRelations = relations(semesters, ({one, many}) => ({
	students: many(students),
	assignments: many(assignments),
	course: one(courses, {
		fields: [semesters.courseId],
		references: [courses.id]
	}),
	subjects: many(subjects),
}));

export const subjectsRelations = relations(subjects, ({one, many}) => ({
	assignments: many(assignments),
	teacherSubjects: many(teacherSubjects),
	semester: one(semesters, {
		fields: [subjects.courseId],
		references: [semesters.id]
	}),
}));

export const otpSessionsRelations = relations(otpSessions, ({one}) => ({
	user: one(users, {
		fields: [otpSessions.userId],
		references: [users.id]
	}),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({one}) => ({
	permission: one(permissions, {
		fields: [rolePermissions.permissionId],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [rolePermissions.roleId],
		references: [roles.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	rolePermissions: many(rolePermissions),
}));

export const roleExtendedUsersRelations = relations(roleExtendedUsers, ({one}) => ({
	role: one(roles, {
		fields: [roleExtendedUsers.roleId],
		references: [roles.id]
	}),
	user: one(users, {
		fields: [roleExtendedUsers.userId],
		references: [users.id]
	}),
}));

export const teacherDepartmentsRelations = relations(teacherDepartments, ({one}) => ({
	department: one(departments, {
		fields: [teacherDepartments.departmentId],
		references: [departments.id]
	}),
	teacher: one(teachers, {
		fields: [teacherDepartments.teacherId],
		references: [teachers.userId]
	}),
}));

export const teacherSubjectsRelations = relations(teacherSubjects, ({one}) => ({
	subject: one(subjects, {
		fields: [teacherSubjects.subjectCode],
		references: [subjects.code]
	}),
	teacher: one(teachers, {
		fields: [teacherSubjects.teacherId],
		references: [teachers.userId]
	}),
}));

export const studentAssignmentsRelations = relations(studentAssignments, ({one}) => ({
	assignment: one(assignments, {
		fields: [studentAssignments.assignmentId],
		references: [assignments.id]
	}),
	student: one(students, {
		fields: [studentAssignments.studentId],
		references: [students.userId]
	}),
}));