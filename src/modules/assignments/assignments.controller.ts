import type { 
	Response, 
	Request, 
} from 'express';
import * as assignmentService from "@/modules/assignments/assignments.service";

export const getAssignments = async (req: Request, res: Response) => {
    try {
        const assignments = await assignmentService.getAssignments();
        res.status(200).json({
			message: "Assignments found successfully!",
			statusCode: 200,
			assignments
		});
    } catch (error) {
        if(error instanceof Error)
            res.status(500).send(error.message);
    }
}
