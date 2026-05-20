import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to satisfy key checks and handle crashes on missing keys
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY env variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. API: Health Triage & Symptom Guide using Gemini
app.post("/api/triage", async (req, res) => {
  try {
    const { symptoms, age, duration, additionalInfo } = req.body;
    if (!symptoms || symptoms.trim() === "") {
      res.status(400).json({ error: "Symptoms description is required" });
      return;
    }

    const ai = getGemini();

    const userInput = `
      Symptoms: ${symptoms}
      Patient Age: ${age || "Not specified"}
      Symptom Duration: ${duration || "Not specified"}
      Additional Context: ${additionalInfo || "None"}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Perform a friendly and supportive medical triage appraisal for a clinic patient portal. Categorize the potential urgency, recommend the best clinic department, and provide helpful educational tips and doctor-directed questions. ALWAYS clearly reiterate that this is informational, simulated triage and NOT a replacement for an in-person doctor or emergency care.

${userInput}`,
      config: {
        systemInstruction: "You are an intelligent clinical desk coordinator assistant at 'CarePoint Medical Clinic'. Your goal is to guide patients based on their symtoms to the correct department and provide helpful, evidence-based health information while strictly avoiding diagnosis. Be highly compassionate, professional, and accurate.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            disclaimer: { 
              type: Type.STRING, 
              description: "A prominent medical disclaimer that this tool provides educational guidance only and does not diagnose." 
            },
            urgency: { 
              type: Type.STRING, 
              description: "The advised care posture: 'Routine Desk Appointment', 'Schedule within 48 Hours', 'Urgent Care Visit', or 'Immediate Emergency Care'" 
            },
            department: { 
              type: Type.STRING, 
              description: "The clinic department: General Med / Family Practice, Pediatrics, Cardiology, Orthopedics, Dermatology, OB-GYN, Neurology, Ophthalmology, or General Surgery" 
            },
            reasoning: { 
              type: Type.STRING, 
              description: "Friendly, logical reasoning for why this department is a good fit and how they can resolve the issue." 
            },
            educationalTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 simple health advice points or comforting educational home measures (e.g. hydration, rest, ice, when to seek immediate help)."
            },
            doctorQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 targeted questions they should ask the physician during their appointment."
            }
          },
          required: ["disclaimer", "urgency", "department", "reasoning", "educationalTips", "doctorQuestions"]
        }
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini triage error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred during symptom appraisal.",
      isKeyMissing: !process.env.GEMINI_API_KEY
    });
  }
});

// Setup Vite Dev server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CarePoint Medical Clinic server is live on http://localhost:${PORT}`);
  });
}

startServer();
