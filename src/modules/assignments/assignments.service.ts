import * as assignmentRepository from "@/modules/assignments/assignments.repository";
import type { CreateAssignmentPayload } from "@/types/assignments";
import { generateUploadPresignedUrl } from "@/utils/s3";
import { AppError } from "@/utils/error";

export const createAssignment = async (userId: string, assignmentData: CreateAssignmentPayload) => {
    const assignment = await assignmentRepository.createAssignment(userId, assignmentData);
	if(!assignment) throw new AppError("Failed to create assignment", 500);

    return assignment;
}

export const getAssignments = async () => {
    const assignments = await assignmentRepository.getAssignments();

    return assignments;
}

export const getFilePatterns = async () => {
    const patterns = await assignmentRepository.getFilePatterns();
	if(!patterns) throw new AppError("Failed to get file patterns", 500);

    return patterns;
}

export const getAssignment = async (id: string) => {
    const assignment = await assignmentRepository.getAssignment(id);
	if(!assignment) throw new AppError("Assignment not found", 404);

    return assignment;
}

export const createSubmission = async (assignmentId: string, studentId: string, fileSize: number) => {
	const result = await assignmentRepository.generateSubmissionKey(assignmentId, studentId);
	if(!result) throw new AppError("Failed to generate submission key", 500);
	if(!result.success) {
		const statusMap: Record<string, number> = {
			"Assignment not found": 404,
			"User not a student": 403,
		};
        throw new AppError(result.error!, statusMap[result.error!] ?? 500);
	}

    const key = result.key!;
	const url = await generateUploadPresignedUrl(key, fileSize);

	const log = await assignmentRepository.createUploadLog({
		assignmentId,
		studentId,
		attachmentKey: key,
	});
	if (!log) throw new AppError("Failed to create upload log", 500);

	return {
		submissionLogId: log.id,
		url
	};
}
