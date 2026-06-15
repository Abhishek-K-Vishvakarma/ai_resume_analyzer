import express from "express";

import upload from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";

import {
  uploadResume,
  getResumeById,
  getMyResumes
} from "../controllers/resume.controller.js";

const router = express.Router();

// resume.routes.js
router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my-resumes", protect, getMyResumes);  
router.get("/:id", protect, getResumeById);

export default router;