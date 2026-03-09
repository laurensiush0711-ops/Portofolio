/// <reference types="vite/client" />

import { GoogleGenAI } from "@google/genai";
import { CV_DATA, EXPERIENCES, SKILLS } from "../constants";

const SYSTEM_INSTRUCTION = `
You are a career assistant representing ${CV_DATA.name}, who is a ${CV_DATA.currentRole} and targeting ${CV_DATA.targetRole}.

Laurensius is transitioning from Game QA to Data Analytics. Your goal is to answer recruiter questions by highlighting how his QA skills (analyzing system failures, data validation in Firebase, API testing) translate perfectly to a Data Analyst role.

Key Background:
- Full Name: ${CV_DATA.name}
- Career History: ${JSON.stringify(EXPERIENCES.map(e => ({ company: e.company, role: e.role, period: e.period })))}
- Specialized Skills: ${JSON.stringify(SKILLS.map(s => ({ name: s.name, category: s.category })))}
- Mission: Using analytical precision from the game industry to drive data insights.
- Transition Story: I leverage a year of QA testing to ensure data integrity and analytical rigor in my new path as a Data Analyst.

Tone & Persona:
- Junior, analytical, and insightful.
- Focus on "Data Integrity", "Logical Modeling", and "Actionable Insights".
- Keep answers concise (2-3 sentences). Use bullet points for skills.
`;

const GEMINI_MODEL = 'gemini-1.5-flash';
const API_TIMEOUT_MS = 15000; // 15 second timeout

export const getCareerAdvice = async (userMessage: string): Promise<string> => {
  // FIX: Use Vite env variable prefix
  const apiKey = import.meta.env.VITE_API_KEY;
  
  if (!apiKey) {
    console.error("Gemini API key missing - check VITE_API_KEY in .env file");
    return "⚠️ Configuration Error: The AI service is not configured. Please contact the developer.";
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4, // Lower for more consistent career advice
        maxOutputTokens: 500,
      },
    });

    clearTimeout(timeoutId);
    
    if (!response.text) {
      return "I apologize, but I couldn't generate a response. Please try rephrasing your question.";
    }
    
    return response.text;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error("Gemini Error:", error);
    
    // Specific error messages based on error type
    if (error.name === 'AbortError') {
      return "⏱️ The request timed out. Please try again in a moment.";
    }
    
    if (error.message?.includes('API key')) {
      return "🔑 API Error: Invalid or expired API key. Please verify configuration.";
    }
    
    if (error.message?.includes('rate limit')) {
      return "🚦 Rate limit reached. Please wait a moment before sending another message.";
    }
    
    if (error.message?.includes('network')) {
      return "📡 Network Error: Please check your internet connection and try again.";
    }
    
    return "😕 I'm having trouble connecting right now. Please try again shortly.";
  }
};
