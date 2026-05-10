const { generateGroqCompletion } = require("./groqService");

async function extractAudioIntent(idea) {
  try {
    const result = await generateGroqCompletion({
      systemPrompt: `
You are an AI semantic extraction engine.

Your task:
Analyze the user's creative advertising idea and extract:
- whether spoken audio or narration is implied
- the likely voice style requested or implied
- the likely soundtrack or music mood

IMPORTANT:
- Infer meaning semantically, not only from explicit keywords.
- If spoken audio is not clearly implied, set "hasVoice" to false.
- If voice style is not clearly present or inferable, return null.
- If music mood is not clearly present or inferable, return null.
- NEVER hallucinate missing audio details.
- Only extract information strongly supported by the user's idea.
- Return ONLY valid JSON.
- Do not explain anything.
- Do not use markdown.
`,

      userPrompt: `
User Idea:
"${idea}"

Return ONLY this JSON format:

{
  "hasVoice": boolean,
  "voiceStyle": string | null,
  "audioMood": string | null
}
`,
      temperature: 0.2,
      maxTokens: 150,
    });

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    return {
      hasVoice: Boolean(parsed?.hasVoice),
      voiceStyle:
        parsed?.voiceStyle ?? null,
      audioMood:
        parsed?.audioMood ?? null,
    };

  } catch (error) {
    console.log(error);
    return {
      hasVoice: false,
      voiceStyle: null,
      audioMood: null,
    };
  }
}

module.exports = {
  extractAudioIntent,
};