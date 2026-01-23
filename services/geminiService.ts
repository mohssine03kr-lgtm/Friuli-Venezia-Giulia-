
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const chatWithConcierge = async (message: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: `You are the AI Concierge for 'Friuli-Venezia Giulia Luxury Portal'. 
      Your tone is sophisticated, welcoming, and expert. 
      You help users with luxury travel, restaurant bookings (e.g. Harry's Piccolo, Agli Amici), and cultural insights (Barcolana, Mittelfest). 
      Use Google Search to find real-time events, weather, or current luxury availability in the FVG region. 
      Keep responses elegant and concise.`,
    },
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((item: any) => item.title && item.uri) || []
  };
};

export const getCulinaryRecipe = async (dishName: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Give me a gourmet recipe for the traditional Friuli-Venezia Giulia dish: ${dishName}. 
    Include high-end plating suggestions and wine pairings (specifically local FVG wines like Friulano, Ribolla Gialla, or Vitovska). 
    Format the response in clear Markdown with bold headers and bullet points.`,
    config: {
      systemInstruction: "You are a Michelin-star chef specialized in Friuli-Venezia Giulia's unique gastronomy.",
    },
  });
  return response.text;
};
