
import { chatMessage } from "@/stores/AIChatStore";
import { createClient } from "@/utils/supabase/client";

import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });


export async function main(chatHistory: chatMessage[]) {

  const supabase = createClient()
  const user = (await (supabase.auth.getUser())).data.user

  const transformed = chatHistory.map(h => {
    console.log("transofomed", h.message);
    
    return {
      role: h.role,
      parts: [{text:h.message}]
    }
  })
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: transformed,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    await supabase.from('AIChat').insert({
      user_id: user?.id,
      chat_history: response.text,
      sender_role: 'model'
    });

    if (response && typeof response.text === "string") {
      return { AIResponse: response?.text, error: null };
    } return { AIResponse: "", error: "Invalid response" };
  } catch (error: any) {


    return { AIResponse: "", error };
  }
}
