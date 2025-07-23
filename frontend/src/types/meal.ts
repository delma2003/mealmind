// src/types/meal.ts

export interface MealPlannerFormData {
  diet: string;            // vegetarian, vegan, etc.
  calories: string;        // as string from input (convert backend if needed)
  mealsPerDay?: number;    // not always used by backend
  allergies: string[];     // ["nuts", "dairy"]
}

export interface MealPlanApiResponse {
  success: boolean;
  data: string;            // raw AI or fallback formatted text
  usedFallback?: boolean;
  message?: string;
}

export interface MealPlannerProps {
  onPlanReceived?: (planText: string, usedFallback: boolean) => void;
}
