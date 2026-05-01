import * as assignmentsRepository from "@/modules/assignments/assignments.repository";
import type { CreateAssignmentPayload } from "@/types/assignments";

export const createAssignment = async (userId: string, assignmentData: CreateAssignmentPayload) => {
    const assignment = await assignmentsRepository.createAssignment(userId, assignmentData);
	if(!assignment) throw new Error("Failed to create assignment");

    return assignment;
}

export const getAssignments = async () => {
    const assignments = await assignmentsRepository.getAssignments();

    return assignments;
}

export const getAssignment = async (id: string) => {
    const assignment = await assignmentsRepository.getAssignment(id);
	if(!assignment) throw new Error("Assignment not found");

    return assignment;
}
