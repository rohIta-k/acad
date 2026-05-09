const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateTagline = async (product) => {

    try {

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Generate a cinematic luxury advertisement tagline for ${product}`
                }
            ],
            model: "llama-3.3-70b-versatile"
        });

        return chatCompletion.choices[0].message.content;

    } catch (error) {
        console.log(error);
        return "Error generating tagline";
    }
};

module.exports = { generateTagline };