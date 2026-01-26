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
 * Elite Italian Travel Guide using 'gemini-3-pro-preview'.
 * Specialized in the "Dolce Vita" knowledge base for deep travel planning.
 * Supports 'Thinking Mode' for complex reasoning.
 */
export const askEliteGuide = async (message: string, history: { role: 'user' | 'model', content: string }[], useThinking: boolean = false) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are the 'Elite Italian Guide', a master of the 'Dolce Vita'. Your language is refined, poetic, and highly descriptive.
      
      YOUR KNOWLEDGE BASE (Use these specific insights):
      - Trieste: The Adriatic pearl. Focus on Piazza Unità d'Italia and Miramare Castle's regal gardens.
      - Venice: Poetic gondola rides, Hotel Danieli suites, and Gothic architecture.
      - Amalfi Coast: Definition of natural luxury. Positano, Ravello, and vintage convertible cars.
      - Florence: Cradle of the Renaissance. Uffizi Gallery, Vasari Corridor tours, and Ponte Vecchio sunsets.
      - Tuscany: Rural beauty, historical villas, Chianti olive oil, and cypress-lined hills.
      - Rome: Trastevere nights, Villa Borghese, and luxury designer boutiques in Via del Corso.
      - Sicily: Taormina's Greek theater meets Etna views, Isola Bella resorts, and granita.
      - Milan: Modernity and tradition. Da Vinci's Last Supper, Brera district, and Galleria Vittorio Emanuele terraces.
      - Lakes: Lake Como (Bellagio, Villa del Balbianello) for discrete elegance; Lake Garda (Sirmione) for thermal luxury.
      - Portofino: Elite fishing village. Super-yachts and white linen vibes.
      - Puglia: Rural luxury in Masserie at Fasano, Trulli in Alberobello, and Salento beaches.
      - Mountains: Cortina d'Ampezzo for prestigious skiing and Michelin-starred après-ski.
      - Gastronomy: Bologna for authentic ragù; Parma for Prosciutto and Verdi's heritage.
      
      TONE: Use words like "cristallino", "panoramico", "barocco", "aristocratico". Always emphasize elegance and luxury details.`,
      thinkingConfig: useThinking ? { thinkingBudget: 32768 } : undefined,
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text || "";
};

/**
 * Low-latency Swift Guide using 'gemini-flash-lite-latest'.
 * Optimized for rapid, snappy responses to common travel queries.
 */
export const askFastGuide = async (message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: message,
    config: {
      systemInstruction: `You are the 'Swift Guide' for the FVG Luxury Portal. 
      Provide rapid, concise, and aristocratic travel advice for Friuli-Venezia Giulia.
      Responses should be helpful but extremely brief and elegant. Speed is the priority.`,
    },
  });
  return response.text || "";
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
 * High-Quality Image Generation for the Portal Gallery using 'gemini-3-pro-image-preview'.
 * Supports 1K, 2K, and 4K resolutions.
 */
export const generateGalleryImage = async (
  prompt: string, 
  aspectRatio: "1:1" | "16:9" | "4:3" | "3:4" | "9:16" = "1:1",
  imageSize: "1K" | "2K" | "4K" = "1K"
) => {
  // Always create a new instance to ensure the most up-to-date API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `Ultra-luxury high-end photography of Friuli-Venezia Giulia, Italy. Subject: ${prompt}. Style: Sophisticated, architectural, cinematic lighting, 8k resolution, elegant composition.` }],
    },
    config: {
      imageConfig: {
        aspectRatio,
        imageSize,
      },
    },
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      // Find the image part in the multi-part response
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  
  throw new Error("The digital artisans were unable to manifest the vision. Please refine the prompt.");
};