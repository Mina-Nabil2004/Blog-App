import { Router } from "express";
import validator from "../middlewares/validator.js";
import authenticate from "../middlewares/authenticate.js";
import { BlogCreateSchema, BlogUpdateSchema } from "../schemas/blogSchema.js";
import { 
  createBlogController, 
  deleteBlogController, 
  getBlogController, 
  getBlogsController, 
  updateBlogController 
} from "../controllers/blogController.js";

const router = Router();

router.get("/", getBlogsController);

router.get("/:id", getBlogController);

router.post("/", authenticate, validator(BlogCreateSchema), createBlogController);

router.patch("/:id", authenticate, validator(BlogUpdateSchema), updateBlogController);

router.delete("/:id", authenticate, deleteBlogController);

export default router;