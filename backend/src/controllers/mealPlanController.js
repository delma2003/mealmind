"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMealPlan = void 0;
const groqClient_1 = require("../utils/groqClient");
const fallbackMealTemplate_1 = __importDefault(require("../utils/fallbackMealTemplate"));
// 🔧 Utility to clean AI response
function parseMealText(text) {
    const startIndex = text.indexOf("**Day 1**");
    if (startIndex === -1)
        return text.trim();
    const sliced = text.slice(startIndex);
    const finalEnd = sliced.search(/This meal plan provides|Feel free to adjust|📋|$/i);
    return sliced.slice(0, finalEnd).trim();
}
const generateMealPlan = async (req, res) => {
    try {
        const { diet, calories, allergies, ingredientChecklist, customIngredients } = req.body;
        const userDiet = diet?.trim() || 'balanced';
        const userCalories = calories?.toString().trim() || '2000';
        const userAllergies = Array.isArray(allergies)
            ? allergies.join(', ')
            : (allergies || 'none').toString().trim();
        const selectedIngredients = Array.isArray(ingredientChecklist)
            ? ingredientChecklist.map((i) => i.trim()).filter(Boolean)
            : [];
        const userCustomIngredients = Array.isArray(customIngredients)
            ? customIngredients.map((i) => i.trim()).filter(Boolean)
            : [];
        const allIngredients = [...selectedIngredients, ...userCustomIngredients];
        const ingredientsText = allIngredients.length > 0
            ? `Use only the following ingredients: ${allIngredients.join(', ')}.`
            : '';
        const prompt = `
Act as a professional nutritionist.

Generate a detailed, healthy 7-day meal plan including breakfast, lunch, and dinner for someone who:
- follows a ${userDiet} diet,
- has a daily calorie goal of ${userCalories} kcal,
- needs to avoid these allergens: ${userAllergies}.
${ingredientsText}

Ensure the plan is nutritious, realistic, and simple to follow. Format each day clearly using **Day 1**, **Day 2**, etc. Do not suggest any ingredients outside the provided list.
    `.trim();
        const response = await groqClient_1.groq.chat.completions.create({
            model: 'llama3-70b-8192',
            messages: [
                { role: 'system', content: 'You are a helpful AI nutritionist.' },
                { role: 'user', content: prompt },
            ],
        });
        const rawText = response.choices?.[0]?.message?.content?.trim();
        const aiText = rawText ? parseMealText(rawText) : '';
        console.log('Parsed meal plan from AI:', aiText);
        if (!aiText || aiText.includes("please provide") || aiText.length < 100) {
            return res.json({
                success: true,
                data: fallbackMealTemplate_1.default,
                usedFallback: true,
                reason: "AI response was incomplete or asking for more input.",
            });
        }
        return res.json({
            success: true,
            data: aiText,
            usedFallback: false,
        });
    }
    catch (error) {
        console.error('Error generating meal plan:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to generate meal plan. Using default plan.',
            data: fallbackMealTemplate_1.default,
            usedFallback: true,
            reason: "Server or AI error.",
        });
    }
};
exports.generateMealPlan = generateMealPlan;
