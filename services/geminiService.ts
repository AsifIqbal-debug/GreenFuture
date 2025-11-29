import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const chatWithGreenGuide = async (userMessage: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: "You are 'GreenGuide', a helpful AI assistant for GreenFuture, a tree planting NGO in Bangladesh. You help users understand the impact of trees, explain how the donation process works (100 BDT per tree), and provide facts about climate change in Bangladesh. Keep answers concise, encouraging, and friendly.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the forest network right now. Please try again later.";
  }
};