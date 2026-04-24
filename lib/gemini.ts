import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateContent(brief: any, brandVoice: any) {
  const prompt = `You are an expert marketing copywriter. Generate content based on the following brief and brand voice guidelines.
  
Brief:
Topic: ${brief.topic}
Audience: ${brief.audience}
Tone: ${brief.tone}
Goals: ${brief.goals}

Brand Voice:
Global Tone: ${brandVoice.tone}
Vocabulary/Keywords to use: ${brandVoice.vocabulary}
Style Guidelines: ${brandVoice.style}

Please write:
1. A 600-word blog post.
2. A professional LinkedIn caption with hashtags.
3. A visual Instagram caption with emojis and hashtags.
4. A concise Twitter/X caption under 280 characters.
5. An engaging email newsletter snippet introducing the content.
6. A detailed visual prompt for an AI image generator (like Canva AI) to create a matching blog header.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          blogPost: { type: Type.STRING, description: "600-word blog post" },
          linkedIn: { type: Type.STRING, description: "LinkedIn caption" },
          instagram: { type: Type.STRING, description: "Instagram caption" },
          twitter: { type: Type.STRING, description: "Twitter/X caption" },
          emailSnippet: { type: Type.STRING, description: "Email newsletter snippet" },
          imagePrompt: { type: Type.STRING, description: "Prompt for header image generation" }
        },
        required: ["blogPost", "linkedIn", "instagram", "twitter", "emailSnippet", "imagePrompt"],
      },
    },
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text.trim());
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    throw new Error("Invalid response from AI");
  }
}
