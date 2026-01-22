
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  if (!API_KEY) {
    console.error("API_KEY is missing. AI features will not work.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const chatWithConcierge = async (message: string, history: { role: 'user' | 'model', content: string }[]) => {
  const ai = getGeminiClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the AI Concierge for the 'Friuli-Venezia Giulia Luxury Portal'. 
      Your tone is sophisticated, welcoming, and highly knowledgeable about Italy's FVG region. 
      You help users with luxury travel recommendations, restaurant bookings, and cultural insights. 
      Keep responses elegant and concise.`,
    },
  });

  // Re-creating chat state is simpler for this POC than full state sync
  // In a real app, we'd pass history to the startChat method
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getCulinaryRecipe = async (dishName: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Give me a gourmet recipe for the traditional Friuli-Venezia Giulia dish: ${dishName}. 
    Include high-end plating suggestions and wine pairings (specifically local FVG wines like Friulano or Ribolla Gialla). 
    Format the response in clear Markdown.`,
    config: {
      systemInstruction: "You are a Michelin-star chef specialized in Friuli-Venezia Giulia's unique gastronomy.",
    },
  });
  return response.text;
};
