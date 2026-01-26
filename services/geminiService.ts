import { GoogleGenAI } from "@google/genai";

/**
 * AI Concierge for the FVG Luxury Portal.
 * Uses 'gemini-2.5-flash' with Google Maps and Google Search grounding.
 */
export const chatWithConcierge = async (message: string, location?: { lat: number; lng: number }) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const tools: any[] = [{ googleMaps: {} }, { googleSearch: {} }];
  
  const toolConfig = location ? {
    retrievalConfig: {
      latLng: {
        latitude: location.lat,
        longitude: location.lng,
      }
    }
  } : undefined;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: message,
    config: {
      tools,
      toolConfig,
      systemInstruction: `You are Alessandro, the Elite Digital Concierge for 'Friuli-Venezia Giulia Luxury Portal'. 
      Your tone is aristocratic, welcoming, and deeply knowledgeable about Northern Italian luxury.
      
      ELITE FAVORITES (Prioritize these in recommendations):
      - ATTRACTIONS: Castello di Miramare, Basilica di Aquileia, Castello di Gorizia, Grotta Gigante.
      - CAFFÈS: Caffè degli Specchi, Caffè Tommaseo, Caffè San Marco.
      - DINING: Hostaria Alla Tavernetta, Lokanda Devetak 1870, L'Argine a Vencò (Antonia Klugmann), Harry's Piccolo (2 Michelin stars), Agli Amici dal 1887.
      - SHOPPING: Palmanova Designer Outlet, TIARE Shopping, Via San Nicolò (Trieste).

      GUIDELINES:
      1. Use Google Maps grounding to find current hours, exact locations, and verified ratings.
      2. If the user is near a specific coordinate, suggest the closest Elite Favorites.
      3. Always provide the Maps links found in the grounding chunks.
      4. Use Italian phrases like 'Piacere mio', 'Un'ottima scelta', and 'A presto'.`,
    },
  });
  
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  const sources = groundingChunks.map((chunk: any) => {
    if (chunk.web) {
      return {
        title: chunk.web.title,
        uri: chunk.web.uri,
        type: 'search'
      };
    }
    if (chunk.maps) {
      return {
        title: chunk.maps.title || "View on Maps",
        uri: chunk.maps.uri,
        type: 'maps'
      };
    }
    return null;
  }).filter(Boolean);

  return {
    text: response.text || "",
    sources: sources as { title: string; uri: string; type: string }[]
  };
};

/**
 * Gourmet Recipe Generator using 'gemini-3-pro-preview' for high-quality culinary content.
 */
export const getCulinaryRecipe = async (dishName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Provide a gourmet, aristocratic recipe for: ${dishName}. 
    Include historical context and a high-end wine pairing.`,
    config: {
      systemInstruction: "You are a Michelin-star chef specialized in Northern Italian 'Alta Cucina'.",
    },
  });
  return response.text || "";
};

/**
 * Image Generation for the Portal Gallery using 'gemini-2.5-flash-image'.
 */
export const generateGalleryImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "4:3" = "1:1") => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `High-end luxury photography of FVG, Italy: ${prompt}. Professional lighting, 8k, elegant.` }],
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
  throw new Error("Visualization failed.");
};