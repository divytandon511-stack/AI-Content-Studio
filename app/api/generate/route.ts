import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { brief, brandVoice } = await req.json();

    const prompt = `You are an expert marketing copywriter. Generate content based on the following brief and brand voice guidelines.
  
Brief:
${JSON.stringify(brief, null, 2)}

Brand Voice:
${JSON.stringify(brandVoice, null, 2)}

Please generate exactly these pieces of content:
1. A 600-word blog post.
2. An engaging LinkedIn caption.
3. An Instagram caption with relevant hashtags.
4. A concise Twitter/X caption under 280 characters.
5. An engaging email newsletter snippet introducing the content.
6. A detailed visual prompt for an AI image generator (like Canva AI) to create a matching blog header.

You MUST respond with valid JSON ONLY. Output a single JSON object with exactly these string keys: "blogPost", "linkedIn", "instagram", "twitter", "emailSnippet", "imagePrompt". Do not output any markdown formatting like \`\`\`json.
`;

    const hfToken = process.env.NEXT_PUBLIC_HF_TOKEN || process.env.HF_TOKEN;
    if (!hfToken) {
      return NextResponse.json({ error: "Missing Hugging Face API token. Please set NEXT_PUBLIC_HF_TOKEN in your environment." }, { status: 401 });
    }

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "Qwen/Qwen3-4B-Instruct-2507:nscale",
          response_format: { type: "json_object" }
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("API error:", err);
      return NextResponse.json({ error: `API responded with status: ${response.status}`, details: err }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
