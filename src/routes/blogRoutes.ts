import { Router } from "express";
import validator from "../middlewares/validator.js";
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

router.post("/",validator(BlogCreateSchema), createBlogController);

router.patch("/:id", validator(BlogUpdateSchema), updateBlogController);

router.delete("/:id", deleteBlogController);

export default router;
