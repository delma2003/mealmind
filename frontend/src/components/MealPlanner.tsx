import React, { useState } from 'react';
import axios from 'axios';

interface MealPlannerProps {
  onPlanReceived?: (planText: string, usedFallback: boolean) => void;
}

const commonIngredients = ['Chicken', 'Eggs', 'Milk', 'Rice', 'Spinach', 'Potatoes', 'Tofu', 'Tomatoes',
  'Broccoli', 'Carrots', 'Oats', 'Banana', 'Apple', 'Wheat Bread', 'Salmon', 'Yogurt',
  'Cheese', 'Lentils', 'Cucumber', 'Zucchini', 'Quinoa', 'Beef', 'Pasta', 'Peas'];

const MealPlanner: React.FC<MealPlannerProps> = ({ onPlanReceived }) => {
  const [diet, setDiet] = useState('');
  const [calories, setCalories] = useState<number>(0);
  const [allergies, setAllergies] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState('');
  const [error, setError] = useState('');

  const handleGenerateMealPlan = async () => {
    setError('');
    setMealPlan('');

    try {
      const response = await axios.post('http://localhost:5000/api/mealplan/meal-plan', {
        diet,
        calories,
        allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
        ingredientChecklist: selectedIngredients,
        customIngredients,
      });

      const { data, usedFallback } = response.data;

      console.log('Received meal plan:', data);

      setMealPlan(data);
      onPlanReceived?.(data, usedFallback);
    } catch (err: unknown) {
      console.error('API error:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to generate meal plan. Please try again.');
      }

      const fallbackPlan = `**Fallback Meal Plan**

**Day 1**
Breakfast: Oatmeal with fruits
Lunch: Veggie wrap
Dinner: Lentil soup with salad`;

      setMealPlan(fallbackPlan);
      onPlanReceived?.(fallbackPlan, true);
    }
  };

  return (
    <div className="w-full p-2">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Smart Meal Planner</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Diet:</label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Keto">Keto</option>
          <option value="Paleo">Paleo</option>
          <option value="Balanced">Balanced</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Calories:</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="e.g. 2000"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Allergies (comma separated):</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. nuts, dairy"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Select Ingredients You Have:</label>
        <div className="grid grid-cols-2 gap-2">
          {commonIngredients.map((ing) => (
            <label key={ing} className="flex items-center text-sm">
              <input
                type="checkbox"
                value={ing}
                checked={selectedIngredients.includes(ing)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedIngredients((prev) =>
                    checked ? [...prev, ing] : prev.filter((i) => i !== ing)
                  );
                }}
                className="mr-2"
              />
              {ing}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Add Custom Ingredients (comma separated):
        </label>
        <input
          type="text"
          placeholder="e.g. tofu, chickpeas"
          onBlur={(e) => {
            const custom = e.target.value
              .split(',')
              .map((i) => i.trim())
              .filter((i) => i);
            setCustomIngredients(custom);
          }}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleGenerateMealPlan}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Generate Meal Plan
      </button>

      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

      {mealPlan && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-inner">
          <h3 className="font-semibold mb-2 text-gray-700">Generated Plan:</h3>
          <div className="grid gap-4">
            {mealPlan.split(/\n{2,}/).map((day, index) => (
              <div key={index} className="bg-white p-3 border rounded shadow-sm">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">{day}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
