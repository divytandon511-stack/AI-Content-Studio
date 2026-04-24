export async function generateContent(brief: any, brandVoice: any) {
  try {
    const response = await fetch('/api/generate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ brief, brandVoice })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 401) {
        throw new Error("Invalid or missing Hugging Face token. Please check your NEXT_PUBLIC_HF_TOKEN configuration.");
      }
      throw new Error(errorData?.error || `API responded with status: ${response.status}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content || "{}";
    
    // In case the model still outputs markdown backticks, strip them
    const cleanedText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    return JSON.parse(cleanedText);
  } catch (e: any) {
    console.error("Failed to parse JSON response or fetch:", e);
    throw new Error(e.message || "Invalid response from AI");
  }
}
