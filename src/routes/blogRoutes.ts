import { Router } from "express";
import validator from "../middlewares/validator.js";
import authenticate from "../middlewares/authenticate.js";
import { BlogCreateSchema, BlogUpdateSchema } from "../schemas/blogSchema.js";
import {
    createBlogController, deleteBlogController, getBlogController,
    getBlogsController, getPublishedBlogsController, getBlogsByUserController,
    updateBlogController, publishBlogController, unpublishBlogController
} from "../controllers/blogController.js";

const router = Router();

router.get("/", getBlogsController);
router.get("/published", getPublishedBlogsController);
router.get("/user/:userID", getBlogsByUserController);
router.get("/:id", getBlogController);
router.post("/", authenticate, validator(BlogCreateSchema), createBlogController);
router.patch("/:id", authenticate, validator(BlogUpdateSchema), updateBlogController);
router.patch("/:id/publish", authenticate, publishBlogController);
router.patch("/:id/unpublish", authenticate, unpublishBlogController);
router.delete("/:id", authenticate, deleteBlogController);

export default router;