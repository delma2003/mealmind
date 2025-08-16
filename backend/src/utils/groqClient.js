"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groq = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const groq_sdk_1 = require("groq-sdk");
exports.groq = new groq_sdk_1.Groq({
    apiKey: process.env.GROQ_API_KEY,
});
