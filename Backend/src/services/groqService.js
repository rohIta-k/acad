const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateResponse = async (prompt) => {
    if (!prompt || typeof prompt !== "string") {
        throw new Error("prompt (string) is required");
    }

    try {

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile"
        });

        return chatCompletion.choices[0].message.content;

    } catch (error) {
        console.log(error);
        throw new Error("Error generating response");
    }
};

module.exports = { generateResponse };