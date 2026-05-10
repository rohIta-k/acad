async function generateGroqCompletion({
  systemPrompt = "",
  userPrompt = "",
  temperature = 0.5,
  maxTokens = 300,
}) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",

      temperature,
      max_tokens: maxTokens,
    });

    return (
      chatCompletion?.choices?.[0]?.message?.content?.trim() || ""
    );

  } catch (error) {
    console.log(error);
    throw new Error("Groq generation failed");
  }
}

module.exports = {
  generateGroqCompletion,
};