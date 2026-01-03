
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIHakimResponse = async (userMessage: string, availableProducts: any[]) => {
  try {
    const productList = availableProducts.map(p => `- ${p.name}: ${p.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User symptoms/query: "${userMessage}"\n\nAvailable products: \n${productList}\n\nYou are an "AI Hakim", a wise traditional Ayurvedic practitioner. Your goal is to provide a empathetic, professional advice based on the user's symptoms and recommend which of our products might help. Keep it concise. If you recommend a product, mention it clearly. Disclaimer: Advise consulting a real doctor for serious issues.`,
      config: {
        systemInstruction: "You are Hakim-ul-Hukama, an ancient wise Ayurvedic healer. You speak with grace and authority.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Hakim Error:", error);
    return "The spirits of the herbs are silent for a moment. Please try again soon.";
  }
};
