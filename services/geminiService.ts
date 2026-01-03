
import { GoogleGenAI } from "@google/genai";

export const getAIHakimResponse = async (userMessage: string, availableProducts: any[]) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key missing, AI Hakim is disabled.");
    return "I am currently meditating on the herbs. Please try again later.";
  }

  const ai = new GoogleGenAI({ apiKey });

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

export const generateProductImage = async (productName: string, productDescription: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Professional product photography of ${productName}. 
  Description: ${productDescription}. 
  Style: Traditional Ayurvedic medicine setting, clean high-end aesthetic, organic herbs and wooden elements in background, soft natural lighting, 4k resolution, studio quality, white or earthy neutral background. 
  The image should focus clearly on the medicine container or the herbal ingredients.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
