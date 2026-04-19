import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import validator from "../middlewares/validator.js";
import { TagCreateSchema, TagUpdateSchema } from "../schemas/tagSchema.js";
import {
    createTagController,
    deleteTagController,
    getTagController,
    getTagsController,
    updateTagController,
    addTagToBlogController,
    removeTagFromBlogController,
    getBlogTagsController,
} from "../controllers/tagController.js";

const router = Router();

router.get("/", getTagsController);

router.get("/:id", getTagController);

router.post("/", authenticate, validator(TagCreateSchema), createTagController);

router.patch("/:id", authenticate, validator(TagUpdateSchema), updateTagController);

router.delete("/:id", authenticate, deleteTagController);

router.get("/blogs/:blogID", getBlogTagsController);

router.post("/blogs/:blogID/:tagID", authenticate, addTagToBlogController);

router.delete("/blogs/:blogID/:tagID", authenticate, removeTagFromBlogController);

export default router;