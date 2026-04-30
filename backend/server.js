const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const path = require("path");

const { extractSkills, analyzeSkills, generateFeedback, generateRoadmap, analyzeResumeQuality, generateJobRecommendations, generateResources } = require("./analyzer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer: store in memory (no disk needed)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AI Career Assistant API is running 🚀" });
});

/**
 * POST /api/analyze
 * Accepts: multipart/form-data with `resume` (PDF) and `jobDescription` (text)
 * Returns: structured JSON with score, skills, feedback, roadmap, resume issues
 */
app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume PDF uploaded." });
    }
    if (!req.body.jobDescription || req.body.jobDescription.trim().length < 50) {
      return res.status(400).json({ error: "Job description is too short. Please provide more details." });
    }

    // 1. Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: "Could not extract readable text from the PDF. Please ensure it's a text-based PDF." });
    }

    const jobDescription = req.body.jobDescription;

    // 2. Extract skills
    const resumeSkills = extractSkills(resumeText);
    const jdSkills = extractSkills(jobDescription);

    // 3. Analyze match
    const { matched, missing, score } = analyzeSkills(resumeSkills, jdSkills);

    // 4. Generate feedback
    const feedback = generateFeedback(matched, missing, score);

    // 5. Generate roadmap
    const roadmap = generateRoadmap(missing);

    // 6. Resume quality analysis
    const resumeIssues = analyzeResumeQuality(resumeText);

    // 7. Job recommendations
    const jobRecommendations = generateJobRecommendations(resumeSkills);

    // 8. Generate learning resources
    const resources = generateResources(missing);

    // 9. Return structured response
    res.json({
      score,
      matched_skills: matched,
      missing_skills: missing,
      resume_skills: resumeSkills,
      jd_skills: jdSkills,
      feedback,
      roadmap,
      resources,
      resume_issues: resumeIssues,
      job_recommendations: jobRecommendations,
      resume_text_preview: resumeText.substring(0, 500) + "...",
    });

  } catch (err) {
    console.error("Analysis error:", err);
    if (err.message.includes("PDF")) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`✅ AI Career Assistant API running on http://localhost:${PORT}`);
});

module.exports = app;
