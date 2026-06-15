import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["uploaded", "analyzed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;