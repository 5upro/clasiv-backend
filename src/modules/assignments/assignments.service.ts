import * as assignmentsRepository from "@/modules/assignments/assignments.repository";

export const getAssignments = async () => {
    const assignments = await assignmentsRepository.getAssignments();

    return assignments;
}
