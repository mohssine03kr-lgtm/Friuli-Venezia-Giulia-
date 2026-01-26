import { GoogleGenAI } from "@google/genai";

/**
 * AI Concierge with "Dolce Vita" persona.
 * Tone is sophisticated, reflecting refined Italian luxury marketing.
 */
export const chatWithConcierge = async (message: string) => {
  // Always initialize GoogleGenAI inside the function with named parameter.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: `You are the Elite Concierge for the 'Friuli-Venezia Giulia Luxury Portal' and an expert on the Italian 'Dolce Vita'. 
      Your tone is sophisticated, poetic, and highly professional.
      
      KNOWLEDGE BASE:
      - Trieste is the "perla dimenticata dell'Adriatico".
      - Focus on exclusive details: private gondolas, royal suites, and private tastings in Collio.
      - Use poetic descriptors: "cristallino", "panoramico", "barocco", "aristocratico".`,
    },
  });
  
  return {
    text: response.text || "",
    // Must extract URLs from groundingChunks when using googleSearch.
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((item: any) => item.title && item.uri) || []
  };
};

/**
 * Gourmet recipe generator for traditional FVG dishes.
 */
export const getCulinaryRecipe = async (dishName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Present a gourmet recipe for the traditional dish: ${dishName}. 
    Highlight authenticity, sensory details, and include FVG wine pairings (Friulano, Ribolla Gialla).`,
    config: {
      systemInstruction: "You are an aristocratic Italian chef, a guardian of regional culinary traditions.",
    },
  });
  return response.text || "";
};

/**
 * Image generator for the digital atelier gallery.
 */
export const generateGalleryImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "4:3" = "1:1") => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `A luxury Italian travel scene: ${prompt}. Professional photography style, natural lighting, elegant.` }],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio,
      },
    },
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  throw new Error("No image data returned from model");
};