import Resume from "../models/Resume.js";
import { calculateATSScore } from "../services/ats.service.js";
import { extractPdfText } from "../services/resume.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const extractedText = await extractPdfText(
      req.file.path
    );

    const atsScore = calculateATSScore(extractedText);

    const resume = await Resume.create({
      userId: req.user._id,
      fileName: req.file.filename,
      fileUrl: req.file.path,
      extractedText,
      atsScore
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded and parsed successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(
      req.params.id
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });
    console.log(req.user._id);
    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};