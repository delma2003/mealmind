"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMealPlanWithAI = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateMealPlanWithAI = async (prompt) => {
    try {
        const response = await axios_1.default.post('https://api.groq.com/openai/v1/chat/completions', {
            model: 'llama3-70b-8192',
            messages: [
                { role: 'system', content: 'You are a helpful meal planner.' },
                { role: 'user', content: prompt }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            }
        });
        const aiMessage = response.data.choices[0]?.message?.content;
        return aiMessage || 'No meal plan generated.';
    }
    catch (error) {
        console.error('❌ Error in AI Call:', error.response?.data || error.message);
        throw new Error('Failed to generate meal plan.');
    }
};
exports.generateMealPlanWithAI = generateMealPlanWithAI;
