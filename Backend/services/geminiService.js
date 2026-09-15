const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIReply = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      config: {
        systemInstruction: `
You are AI Chatbot, a helpful and friendly virtual assistant.

Always identify yourself as AI Chatbot.
Do not say that you are Gemini unless the user specifically asks which underlying AI model powers you.
Answer clearly and naturally.
        `,
      },

      contents: message,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw error;
  }
};

module.exports = {
  generateAIReply,
};