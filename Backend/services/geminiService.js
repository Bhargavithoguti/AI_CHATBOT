const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateAIReply = async (message) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        config: {
          systemInstruction: `
You are AI Chatbot, a helpful and friendly virtual assistant.
Always identify yourself as AI Chatbot.
Answer clearly and naturally.
          `,
        },
        contents: message,
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API error:", error.message);

      if (attempt === 2) {
        throw error;
      }

      await delay(1000 * 2 ** attempt);
    }
  }
};

module.exports = {
  generateAIReply,
};