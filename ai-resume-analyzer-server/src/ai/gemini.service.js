import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);
console.log(process.env.GEMINI_API_KEY);
export const analyzeResumeWithAI = async (resumeText) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
    });

    const prompt = `
You are an ATS (Applicant Tracking System) and Senior Technical Recruiter.

Analyze the resume and return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Rules:
1. ATS score should be between 0 and 100.
2. Evaluate skills, projects, experience, achievements, formatting and keywords.
3. Return only JSON.
4. Do not include markdown.

Resume:
${ resumeText }
`;

    const result = await model.generateContent(prompt);

    const text = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message);
  }
};