"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/config/openai.ts
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENROUTER_API_KEY || '',
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173', // frontend URL or domain
        'X-Title': 'MealMind AI',
    },
});
exports.default = openai;
