import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const chatWithGreenGuide = async (userMessage: string, language: 'en' | 'bn' = 'en'): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Adjust system instruction based on language
    const systemInstruction = language === 'bn' 
      ? "আপনি 'গ্রিন গাইড', গ্রিন ফিউচারের একজন সহায়ক এআই সহকারী। গ্রিন ফিউচার বাংলাদেশে গাছ লাগানোর একটি এনজিও। ব্যবহারকারীদের গাছের প্রভাব বুঝতে সাহায্য করুন, অনুদান প্রক্রিয়া (প্রতি গাছ ১০০ টাকা) ব্যাখ্যা করুন এবং বাংলাদেশে জলবায়ু পরিবর্তন সম্পর্কে তথ্য দিন। উত্তরগুলি সংক্ষিপ্ত, উৎসাহজনক এবং বন্ধুত্বপূর্ণ রাখুন। এবং অবশ্যই বাংলায় উত্তর দিন।"
      : "You are 'GreenGuide', a helpful AI assistant for GreenFuture, a tree planting NGO in Bangladesh. You help users understand the impact of trees, explain how the donation process works (100 BDT per tree), and provide facts about climate change in Bangladesh. Keep answers concise, encouraging, and friendly.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || (language === 'bn' ? "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।" : "I'm sorry, I couldn't process that request right now.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'bn' 
      ? "আমি এখন ফরেস্ট নেটওয়ার্কের সাথে সংযোগ করতে সমস্যায় পড়েছি। দয়া করে পরে আবার চেষ্টা করুন।" 
      : "I'm having trouble connecting to the forest network right now. Please try again later.";
  }
};
