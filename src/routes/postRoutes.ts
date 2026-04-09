import { Router } from "express";
import validator from "../middlewares/validator.js";
import { PostCreateSchema, PostUpdateSchema } from "../schemas/postSchema.js";
import { 
  createPostController, 
  deletePostController, 
  getPostController, 
  getPostsController, 
  updatePostController 
} from "../controllers/postController.js";

const router = Router();

router.get("/", getPostsController);

router.get("/:id", getPostController);

router.post("/",validator(PostCreateSchema), createPostController);

router.put("/:id", validator(PostUpdateSchema), updatePostController);

router.delete("/:id", deletePostController);

export default router;
