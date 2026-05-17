import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// High-limit for image uploads
app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/analyze-food", async (req, res) => {
  try {
    const { image } = req.body; // Expecting base64 string without prefix

    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: "Analyze this food image for a high-performance wellness app. Detect all visible food items precisely, estimate portion sizes, and return a JSON object. \n\nGuidelines:\n1. 'detected_items': Array of specific names.\n2. 'calories': Precise integer estimate.\n3. 'protein', 'carbs', 'fat': Mass in grams.\n4. 'health_score': 1-10 based on metabolic efficiency.\n5. 'recommendations': A concise, professional, and encouraging insight (max 20 words).\n\nFocus on accuracy and professional tone." },
            { 
              inlineData: { 
                mimeType: "image/jpeg", 
                data: image 
              } 
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detected_items: { type: Type.ARRAY, items: { type: Type.STRING } },
            calories: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fat: { type: Type.NUMBER },
            health_score: { type: Type.NUMBER },
            recommendations: { type: Type.STRING }
          },
          required: ["detected_items", "calories", "protein", "carbs", "fat", "health_score", "recommendations"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze image" });
  }
});

// Vite middleware flow
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NutriLens AI Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
