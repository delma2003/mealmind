import axios from 'axios';

interface Preferences {
  diet: string;
  calories: number;
  allergies: string[];
}

export const generateMealPlan = async (preferences: Preferences) => {
  const response = await axios.post('/api/mealplan/generate', preferences);
  return response.data;
};
