import { Router } from "express";
import * as assignmentController from "@/modules/assignments/assignments.controller";
import authentication from "@/middleware/global.authentication";
import validator from "@/middleware/global.validator";
import { 
    CreateAssignmentSchema,
    UploadSubmissionSchema
} from "@/types/assignments";

const router = Router();

router.use(authentication);

/*
* ROUTE: POST /assignments
* BODY: 
* {
*     title: string,
*     description: string,
*     collegeCourseSubjectId: string,
*     maxMarks?: number,
*     attachmentUrl?: string,
*     dueAt: Date, [in string format]
*     expiresAt: Date, [in string format]
*     filePattern: number[],
* }
*/
router.post("/", 
    validator(CreateAssignmentSchema),
    assignmentController.createAssignment
);

/*
* ROUTE: GET /assignments
*/
router.get("/", 
    assignmentController.getAssignments
);

/*
* ROUTE: GET /assignments/:id
*/
router.get("/:id", 
    assignmentController.getAssignment
);

/*
* ROUTE: POST /assignments
* BODY: 
* {
*     fileSize: number,
* }
*/
router.post("/:id/submissions",
    validator(UploadSubmissionSchema),
	assignmentController.createSubmission
);

export default router;
