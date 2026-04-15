# CareerAI — AI Career Assistant

A full-stack AI-powered web application that analyzes your resume against any job description and gives you:

- ✅ **Match Score** (%) with visual chart
- 🟢 **Matched Skills** / 🔴 **Missing Skills**
- 🤖 **Explainable AI Feedback**
- 🗺️ **Personalized Week-by-Week Roadmap**
- 🔍 **Resume Quality Analysis**

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

---

### 1. Start the Backend

```bash
cd backend
npm install        # (skip if already done)
node server.js
```

Backend runs on: **http://localhost:5000**

---

### 2. Start the Frontend

```bash
cd frontend-app
npm install        # (skip if already done)
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 📁 Folder Structure

```
ai-career-assistant/
├── backend/
│   ├── server.js          # Express API server
│   ├── analyzer.js        # Skill extraction, scoring, feedback, roadmap
│   ├── skillsDb.js        # 200+ skills keyword database
│   └── package.json
│
└── frontend-app/
    ├── src/
    │   ├── pages/
    │   │   ├── LandingPage.jsx    # Hero / features / CTA
    │   │   ├── DashboardPage.jsx  # Upload + JD input
    │   │   └── ResultsPage.jsx    # Full results view
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── vite.config.js
```

---

## 🧪 Testing with Sample Data

1. Open the Dashboard page
2. Click **"Use sample JD →"** to auto-fill the job description
3. Upload any text-based PDF (your resume or a sample)
4. Click **Analyze My Resume**

**Sample resume content** (paste into a PDF converter if needed):
```
John Doe | john@example.com | github.com/johndoe

EXPERIENCE
Software Engineer Intern – TechCorp (2024)
Developed React frontend components and REST APIs using Node.js.

SKILLS
Python, JavaScript, React, HTML, CSS, Git, SQL

EDUCATION
B.Tech Computer Science – XYZ University (2025)
```

---

## 🔌 API Reference

### `POST /api/analyze`

**Request:** `multipart/form-data`
- `resume` — PDF file
- `jobDescription` — string (min 50 chars)

**Response:**
```json
{
  "score": 68,
  "matched_skills": ["react", "javascript", "sql"],
  "missing_skills": ["aws", "docker", "typescript"],
  "feedback": ["✅ Good match! ...", "📌 You lack cloud experience..."],
  "roadmap": [
    { "week": "Week 1", "title": "AWS Cloud Basics", "description": "...", "icon": "☁️" }
  ],
  "resume_issues": [
    { "type": "missing", "message": "Projects section missing", "severity": "medium" }
  ]
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| PDF Parsing | pdf-parse |
| File Upload | Multer |
| Styling | Glassmorphism + CSS animations |
