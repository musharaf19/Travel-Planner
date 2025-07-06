import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Allow CORS for frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Example: http://localhost:5173
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Message is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(message);
    const responseText = result?.response?.text || "I couldn't understand that.";

    const formattedResponse = responseText
      .replace(/\n+/g, " ")
      .replace(/\*\*(.*?)\*\*/g, "")
      .replace(/\*(.*?)\*/g, "")
      .trim();

    res.json({ reply: formattedResponse });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

// Simple base route
app.get("/", (req, res) => {
  res.send("Welcome to Gemini AI Chatbot Server");
});

// Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
