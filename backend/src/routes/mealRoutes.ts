import express from 'express';
import { generateMealPlan } from '../controllers/mealPlanController';

const router = express.Router();

router.post('/meal-plan', generateMealPlan);

export default router;
