import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";

import { analyzeResumeWithAI } from "../ai/gemini.service.js";
import mongoose from "mongoose";

export const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(
      req.params.resumeId
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResult = await analyzeResumeWithAI(
      resume.extractedText
    );

    const analysis = await Analysis.create({
      userId: req.user._id,
      resumeId: resume._id,
      atsScore: aiResult.atsScore,
      strengths: aiResult.strengths || [],
      weaknesses: aiResult.weaknesses || [],
      missingSkills: aiResult.missingSkills || [],
      suggestions: aiResult.suggestions || [],
      matchPercentage: aiResult.matchPercentage || 0
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyAnalysis = async (
  req,
  res
) => {
  try {
    const analysises = await Analysis.find({userId: req.user._id}).sort({createdAt: -1,});
    console.log(analysises);
    res.status(200).json({
      success: true,
      analysises,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAnalysisById = async (req, res) => {
  try {
    console.log("Searching analysis with:", {
      id: req.params.id,
      userId: req.user._id
    });
    const analysis = await Analysis.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      userId: req.user._id
    });
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

