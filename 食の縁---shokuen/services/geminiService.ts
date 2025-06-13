
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Producer } from "../types"; // Adjusted path if types.ts is at root

// IMPORTANT: API key management
// The API key MUST be set as an environment variable `process.env.API_KEY`.
// This code assumes `process.env.API_KEY` is available in the execution environment.
// DO NOT embed the API key directly in the code.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API Key is not configured. AI features will be disabled. Please set the API_KEY environment variable.");
}

interface ProducerStoryInfo {
  name: string;
  specialty: string[];
  philosophy: string;
}

export const generateProducerStory = async (info: ProducerStoryInfo): Promise<string> => {
  if (!ai) {
    return "AI機能は現在利用できません。APIキーが設定されていません。";
  }

  try {
    // Note: This prompt is crafted in Japanese to align with the app's context.
    const prompt = `あなたは食と人々の間の「縁」をテーマにした物語を紡ぐAIストーリーテラーです。
以下の情報を持つ生産者について、心温まる短い物語（約150字から200字程度）を創作してください。
物語は、生産者の食材が人々の食卓に届き、そこから生まれる喜びや繋がり、生産者の情熱を表現するものにしてください。
生産者の名前や専門分野を自然に物語に織り込んでください。

生産者名: ${info.name}
専門: ${info.specialty.join('、')}
理念・こだわり: ${info.philosophy}

物語:`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17", // Using the specified model
      contents: prompt,
      config: {
        temperature: 0.75, // For creative and warm stories
        topP: 0.95,
        topK: 40,
        // responseMimeType: "text/plain" // Default is text/plain
      }
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    if (error instanceof Error) {
        return `AIによる物語生成に失敗しました: ${error.message}`;
    }
    return "AIによる物語生成中に不明なエラーが発生しました。";
  }
};

export const getRecentProducerNews = async (producerName: string): Promise<{text: string, sources: any[]}> => {
  if (!ai) {
    return { text: "AI機能は現在利用できません。APIキーが設定されていません。", sources: [] };
  }
  try {
    const prompt = `直近の ${producerName} に関するニュースや活動について教えてください。`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}], // Enable Google Search grounding
      },
   });

   const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
   return { text: response.text, sources: groundingChunks };

  } catch (error) {
    console.error("Error fetching producer news with Gemini:", error);
     if (error instanceof Error) {
        return { text: `AIによる情報検索に失敗しました: ${error.message}`, sources: [] };
    }
    return { text: "AIによる情報検索中に不明なエラーが発生しました。", sources: [] };
  }
};
