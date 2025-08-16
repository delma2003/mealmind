"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNutrition = getNutrition;
const axios_1 = __importDefault(require("axios"));
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_URL = "https://api.spoonacular.com/recipes/parseIngredients";
async function getNutrition(ingredientList) {
    try {
        const res = await axios_1.default.post(SPOONACULAR_URL, null, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                ingredientList,
                servings: 1,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const ingredients = res.data;
        let total = {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
        };
        for (const item of ingredients) {
            if (item.nutrition) {
                for (const nutrient of item.nutrition.nutrients) {
                    const name = nutrient.name.toLowerCase();
                    const value = nutrient.amount;
                    if (name === "calories")
                        total.calories += value;
                    else if (name === "protein")
                        total.protein += value;
                    else if (name === "fat")
                        total.fat += value;
                    else if (name === "carbohydrates")
                        total.carbs += value;
                }
            }
        }
        return total;
    }
    catch (error) {
        console.error("🔴 Spoonacular API error:", error);
        throw new Error("Failed to fetch nutrition info.");
    }
}
