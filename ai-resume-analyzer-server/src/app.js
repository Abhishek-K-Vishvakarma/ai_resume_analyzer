import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";


import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);


export default app;