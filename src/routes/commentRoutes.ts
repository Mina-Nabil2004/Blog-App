import { Router } from "express";
import { CommentCreateSchema, CommentUpdateSchema } from "../schemas/commentSchema.js";
import validator from "../middlewares/validator.js";
import { 
  createCommentController, 
  deleteCommentController, 
  getCommentController, 
  getCommentsController, 
  updateCommentController 
} from "../controllers/commentController.js";

const router = Router();

router.get("/", getCommentsController);

router.get("/:id", getCommentController);

router.post("/",validator(CommentCreateSchema), createCommentController);

router.patch("/:id", validator(CommentUpdateSchema), updateCommentController);

router.delete("/:id", deleteCommentController);

export default router;