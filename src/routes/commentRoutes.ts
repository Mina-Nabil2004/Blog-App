import { Router } from "express";
import { CommentCreateSchema, CommentUpdateSchema } from "../schemas/commentSchema.js";
import validator from "../middlewares/validator.js";
import authenticate from "../middlewares/authenticate.js";
import {
    createCommentController, deleteCommentController, getCommentController,
    getCommentsController, getCommentsByBlogController, getCommentsByUserController,
    updateCommentController
} from "../controllers/commentController.js";

const router = Router();

router.get("/", getCommentsController);
router.get("/blog/:blogID", getCommentsByBlogController);
router.get("/user/:userID", getCommentsByUserController);
router.get("/:id", getCommentController);
router.post("/", authenticate, validator(CommentCreateSchema), createCommentController);
router.patch("/:id", authenticate, validator(CommentUpdateSchema), updateCommentController);
router.delete("/:id", authenticate, deleteCommentController);

export default router;