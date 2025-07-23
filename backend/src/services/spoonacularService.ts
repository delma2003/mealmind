import axios from "axios";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;
const SPOONACULAR_URL = "https://api.spoonacular.com/recipes/parseIngredients";

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface Nutrient {
  name: string;
  amount: number;
}

interface ParsedIngredient {
  nutrition: {
    nutrients: Nutrient[];
  };
}

export async function getNutrition(ingredientList: string): Promise<NutritionInfo> {
  try {
    const res = await axios.post<ParsedIngredient[]>(SPOONACULAR_URL, null, {
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

    let total: NutritionInfo = {
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

          if (name === "calories") total.calories += value;
          else if (name === "protein") total.protein += value;
          else if (name === "fat") total.fat += value;
          else if (name === "carbohydrates") total.carbs += value;
        }
      }
    }

    return total;
  } catch (error) {
    console.error("🔴 Spoonacular API error:", error);
    throw new Error("Failed to fetch nutrition info.");
  }
}
