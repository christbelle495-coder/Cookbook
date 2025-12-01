import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedRecipeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipeDetails = async (recipeName: string): Promise<GeneratedRecipeData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a detailed and delicious recipe for "${recipeName}".`,
      config: {
        systemInstruction: "You are a world-class chef. Generate a structured recipe JSON based on the recipe name provided. Be creative but realistic.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING, description: "A tempting short description (max 2 sentences)" },
            prepTime: { type: Type.STRING, description: "Preparation time e.g. '15 min'" },
            cookTime: { type: Type.STRING, description: "Cooking time e.g. '45 min'" },
            servings: { type: Type.INTEGER },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of ingredients with quantities"
            },
            instructions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Step by step instructions"
            },
            category: { type: Type.STRING, description: "Best fit category e.g. Breakfast, Dinner, Dessert" }
          },
          required: ["description", "prepTime", "cookTime", "servings", "ingredients", "instructions", "category"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as GeneratedRecipeData;

  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};
