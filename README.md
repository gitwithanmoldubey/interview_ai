# Interview.AI -- AI-Powered Interview Preparation & Strategy Generator 🚀

**Interview.AI** is a full-stack, AI-powered interview strategy and resume generation platform designed to help job seekers crack technical and behavioral interviews with personalized roadmaps, 10 technical questions, 10 behavioral questions (STAR model answers), skill gap analysis, and 1-page ATS-formatted LaTeX resume PDFs.

---

## 🌟 Key Features

- **🎯 Personalized Interview Strategy**: AI generates tailored technical and behavioral questions matched directly against target Job Descriptions.
- **📄 1-Page ATS Resume PDF Generator**: Compiles single-page, ATS-compliant LaTeX-style PDF resumes using Puppeteer.
- **📊 Skill Gap Analysis**: Highlights missing competencies with low, medium, and high severity ratings.
- **📅 Day-Wise Preparation Roadmap**: Interactive daily checklist for structured interview preparation.
- **🔐 JWT Authentication**: Secure user registration, password hashing, and token-based session management.
- **🎨 Ambient Dark Glassmorphism UI**: High-aesthetic responsive web design powered by modern SCSS and React.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, SCSS (Glassmorphism design system)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Zod Validation
- **AI & PDF**: Google Gemini AI (`@google/genai`), Puppeteer (headless PDF compiler)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Database URI
- Google Gemini API Key

### 2. Backend Setup
```bash
cd Backend
npm install
# Create a .env file with the following variables:
# PORT=3000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# GOOGLE_GENAI_API_KEY=your_gemini_api_key

npm start
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

---

## 👨‍💻 Developer & Author

**Anmol Dubey**
- **Portfolio**: [https://protfolio-nine-inky.vercel.app/](https://protfolio-nine-inky.vercel.app/)
- **LinkedIn**: [https://linkedin.com/in/anmol23](https://linkedin.com/in/anmol23)
- **GitHub**: [https://github.com/gitwithanmoldubey](https://github.com/gitwithanmoldubey)
- **LeetCode**: [https://leetcode.com/u/anmoldubey2310/](https://leetcode.com/u/anmoldubey2310/)
- **Email**: [anmoldubey2310@gmail.com](mailto:anmoldubey2310@gmail.com)
