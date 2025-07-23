// src/controllers/mealController.ts
import { Request, Response } from 'express';
import { generateMealPlanWithAI } from '../utils/mealAI';

export const generateMealPlan = async (req: Request, res: Response) => {
  try {
    const {
      preferences,
      calorieGoal,
      allergens,
      ingredientsAvailable = [],
      customIngredients = [],
    } = req.body;

    const combinedIngredients = [...ingredientsAvailable, ...customIngredients].join(', ');

    const prompt = `
Generate a detailed 7-day meal plan based on:
- Diet: ${preferences}
- Daily Calories: ${calorieGoal}
- Allergies to avoid: ${allergens?.join(", ") || "None"}

ONLY use these available ingredients: ${combinedIngredients}

Ensure every meal follows the dietary rules and calorie limit. Format as: **Day 1** with Breakfast, Lunch, Dinner.
`;

    console.log("🔍 AI Prompt:", prompt);

    const aiResponse = await generateMealPlanWithAI(prompt);

    console.log("✅ AI Response:", aiResponse);

    res.status(200).json({ success: true, data: aiResponse });
  } catch (error: any) {
    console.error("💥 Full Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate meal plan." });
  }
};
