import { GoogleGenAI, Type } from "@google/genai";
import { Asset } from "../types";

const apiKey = process.env.API_KEY || ''; // In a real app, this would be handled securely
// Note: We are assuming process.env.API_KEY is available. If not, the service will fail gracefully.

const ai = new GoogleGenAI({ apiKey });

export interface MarketAnalysis {
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  riskAnalysis: string;
  keyFactors: string[];
}

export const analyzeAsset = async (asset: Asset): Promise<MarketAnalysis> => {
  try {
    if (!apiKey) {
      // Mock response if no API key
      return {
        sentiment: 'BULLISH',
        riskAnalysis: 'This is a simulated analysis because no API Key was provided. The asset shows strong fundamentals consistent with high-grade institutional treasuries.',
        keyFactors: ['Low volatility detected', 'Strong yield relative to market', 'High liquidity expected']
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this institutional asset for a professional trader: ${JSON.stringify(asset)}. Provide a risk assessment and sentiment.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ['BULLISH', 'BEARISH', 'NEUTRAL'] },
            riskAnalysis: { type: Type.STRING },
            keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as MarketAnalysis;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      sentiment: 'NEUTRAL',
      riskAnalysis: 'AI Analysis temporarily unavailable. Proceed with standard due diligence.',
      keyFactors: ['Data unavailable']
    };
  }
};