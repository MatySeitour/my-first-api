import { Router } from "express";
import { getAuthors } from "../controllers/authors.controllers.js";

const router = Router();

router.get(`/api/authors`, getAuthors);

export default router;
