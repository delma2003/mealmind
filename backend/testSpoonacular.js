"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || 'your_key_here';
// Replace this with real ingredients (you can modify later)
const ingredientText = `
1 cup rice
200g chicken breast
1 tablespoon olive oil
`;
async function fetchNutrition() {
    try {
        const response = await (0, node_fetch_1.default)(`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${SPOONACULAR_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                ingredientList: ingredientText,
                servings: '1',
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('❌ Spoonacular API Error:', data);
        }
        else {
            console.log('✅ Nutrition Info:', JSON.stringify(data, null, 2));
        }
    }
    catch (error) {
        console.error('❌ Unexpected Error:', error);
    }
}
fetchNutrition();
