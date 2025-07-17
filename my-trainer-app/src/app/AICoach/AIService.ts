import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function main( chatInfo:{ role: "user" | "model", parts: [{ text: string }] }[]) {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chatInfo,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            }
        });
        if (response && response.text && typeof response.text === "string" ) {
            return response.text
           
        }

    }