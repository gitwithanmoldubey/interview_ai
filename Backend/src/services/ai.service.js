const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")
const fs = require("fs")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY || "dummy_api_key"
})

async function generateContentWithFallback({ contents, responseSchema }) {
    const models = ["gemini-3-flash-preview", "gemini-2.5-flash", "gemini-2.0-flash"]
    let lastErr = null
    for (const model of models) {
        try {
            const res = await ai.models.generateContent({
                model,
                contents,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                }
            })
            return res
        } catch (err) {
            console.warn(`Model ${model} error: ${err.message}. Trying next fallback model...`)
            lastErr = err
        }
    }
    throw lastErr
}


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(10).max(10).describe("List of EXACTLY 10 technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(10).max(10).describe("List of EXACTLY 10 behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate a comprehensive interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        REQUIREMENTS:
                        - Generate EXACTLY 10 relevant, high-quality Technical Questions.
                        - Generate EXACTLY 10 relevant, high-quality Behavioral Questions using the STAR method format for answers.
                        - Provide detailed intentions and comprehensive model answers for every question.
`

    const response = await generateContentWithFallback({
        contents: prompt,
        responseSchema: zodToJsonSchema(interviewReportSchema)
    })

    return JSON.parse(response.text)


}



async function generatePdfFromHtml(htmlContent) {
    const launchOptions = {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
    const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

    if (fs.existsSync(edgePath)) {
        launchOptions.executablePath = edgePath
    } else if (fs.existsSync(chromePath)) {
        launchOptions.executablePath = chromePath
    }

    const browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "10mm",
            bottom: "10mm",
            left: "10mm",
            right: "10mm"
        },
        printBackground: true
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The full HTML document including inline CSS styled as a clean 1-page LaTeX professional resume")
    })

    const prompt = `Generate an ATS-friendly, single-page professional resume tailored for the job description.
Candidate Contact & Profile Details:
- Name: Anmol Dubey
- Phone: +91-7398867267 | Location: India
- Email: anmoldubey2310@gmail.com
- Portfolio: https://protfolio-nine-inky.vercel.app/
- LinkedIn: https://linkedin.com/in/anmol23
- LeetCode: https://leetcode.com/u/anmoldubey2310/
- GitHub: https://github.com/gitwithanmoldubey

Candidate Core Technical Skills:
- Programming Languages: Python, Java, JavaScript, C++, SQL
- Core Subjects: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, SDLC
- Frameworks & Libraries: Flask, React.js, Node.js, Express.js, Tailwind CSS
- Machine Learning: Scikit-learn, Random Forest
- Databases: MySQL, MongoDB
- Web Technologies: REST APIs, HTML5, CSS3
- Tools & Version Control: Git, GitHub, Docker, Postman, VS Code

Education:
- United College of Engineering and Research, Prayagraj (2022 -- 2026) | Bachelor of Technology in CSE | CGPA: 7.10

Experience:
- IBM Virtual Internship -- Web Development (Sep 2025 -- Nov 2025)
- MERN Development Training -- United Global Infoservice Pvt. Ltd. (Jan 2025 -- Mar 2025)

Projects Order:
- Project 1: HeartSense -- AI-Based Cardiovascular Risk Prediction System (Python, Flask, Scikit-learn, React)
- Project 2: Interview.AI -- AI-Powered Interview Preparation & Strategy Generator (React, Node.js, Express.js, MongoDB, Puppeteer, Gemini AI)
- Project 3: Crack Coding Live (300+ coding problems platform, Node.js, Express, MongoDB)
- Project 4: Anmol Studio (MERN E-Commerce App)

Data Structures & Algorithms:
- Solved 200+ coding problems on LeetCode and GeeksforGeeks.

Certifications:
- Web Development Bootcamp -- Angela Yu
- Data Structures & Algorithms -- CodeHelp by Love Babbar

Resume / Context: ${resume}
Self Description: ${selfDescription}
Target Job Description: ${jobDescription}

The output must be a JSON object with a single key "html" containing full standalone HTML code with CSS embedded in a <style> tag.

CRITICAL DESIGN & LAYOUT REQUIREMENTS (Strict 1-Page LaTeX Style):
1. STYLING & TYPOGRAPHY:
   - Clean, professional serif/sans-serif font (font-family: 'Times New Roman', Georgia, serif or Arial, sans-serif).
   - Body font size: 11px - 12px, line-height: 1.35. Margins: 0, padding: 0.
   - Standard A4 page, strictly designed to fit on EXACTLY 1 PAGE without overflow.
   - Text color: #111111.

2. HEADER SECTION (MANDATORY CONTACT DETAILS):
   - Centered Candidate Name in 22px bold uppercase font: ANMOL DUBEY
   - Subheader centered below name with formatted links:
     +91-7398867267 | India | <a href="mailto:anmoldubey2310@gmail.com">anmoldubey2310@gmail.com</a> | <a href="https://protfolio-nine-inky.vercel.app/">Portfolio</a> | <a href="https://linkedin.com/in/anmol23">LinkedIn</a> | <a href="https://leetcode.com/u/anmoldubey2310/">LeetCode</a> | <a href="https://github.com/gitwithanmoldubey">GitHub</a>

3. MANDATORY SECTIONS TO INCLUDE IN THIS EXACT ORDER:
   - OBJECTIVE
   - EDUCATION
   - EXPERIENCE
   - PROJECTS (With Interview.AI as Project #2)
   - TECHNICAL SKILLS (MANDATORY: Must include Programming Languages, Frameworks, Machine Learning, Databases, Tools)
   - DATA STRUCTURES & ALGORITHMS
   - CERTIFICATIONS

4. SECTION HEADERS & FORMATTING:
   - Uppercase section titles with a solid bottom border line (border-bottom: 1.5px solid #222; margin-top: 10px; margin-bottom: 6px; padding-bottom: 2px; text-transform: uppercase; font-weight: bold; font-size: 13px;).
   - Bullet points using <ul> and <li> with left margin 16px, compact spacing (margin-bottom: 3px).
   - Tailor bullet point keywords to highlight alignment with the Target Job Description.

Return ONLY valid JSON matching the schema with the generated single-page HTML resume content.`

    const response = await generateContentWithFallback({
        contents: prompt,
        responseSchema: zodToJsonSchema(resumePdfSchema)
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }