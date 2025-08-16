"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIResponse = getAIResponse;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY, // Put this in your .env
});
async function getAIResponse(prompt) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama3-70b-8192", // or use mistral-7b, llama3-8b, etc.
    });
    return chatCompletion.choices[0].message.content || "";
}
