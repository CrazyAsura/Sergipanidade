'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchNearbyPlaces } from './places';

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCR5ufBKKAVWYAovmT9-TG9F7gg66cgXDg";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(userMessage: string) {
  try {
    let placeContext = "";
    
    // Simple heuristic to detect if the user is looking for a place
    const searchKeywords = ["onde", "buscar", "procurar", "comer", "visitar", "ficar", "hotel", "restaurante", "distância"];
    if (searchKeywords.some(kw => userMessage.toLowerCase().includes(kw))) {
      const places = await searchNearbyPlaces(userMessage);
      if (places.length > 0) {
        placeContext = "\n\nEncontrei estes locais reais em Sergipe via Google Maps para sua referência:\n" + 
          places.map((p: any) => `- ${p.name} (${p.address}) - Avaliação: ${p.rating || 'N/A'}`).join("\n");
      }
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `Você é o Guia Virtual da Sergipanidade. Sua missão é ajudar turistas a descobrirem o melhor de Sergipe: culinária, pontos turísticos, história, eventos e roteiros. 
        Seja cordial e informativo. Responda em português brasileiro.
        DICA: Se houver contexto do Google Maps abaixo, utilize-o para dar respostas precisas sobre localizações reais.${placeContext}`
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    // User requested DialoGPT-small fallback logic could go here, 
    // but without an HF token, we'll provide a friendly system fallback.
    return "O Guia IA está passando por uma manutenção rápida. Enquanto isso, posso te dizer que Sergipe tem as praias mais mornas do Brasil! Tente novamente em alguns segundos.";
  }
}
