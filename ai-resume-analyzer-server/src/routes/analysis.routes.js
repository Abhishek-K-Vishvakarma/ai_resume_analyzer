import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  analyzeResume,
  getAnalysisById,
  getMyAnalysis
} from "../controllers/analysis.controller.js";

const router = express.Router();

router.post(
  "/:resumeId",
  protect,
  analyzeResume
);

router.get(
  "/my-analysis",
  protect,
  getMyAnalysis
);


router.get("/:id", protect, getAnalysisById);

export default router;