// src/routes/mealPlanRoutes.ts

import express from "express";
import { generateMealPlan } from "../controllers/mealPlanController";

const router = express.Router();

// POST /api/mealplan
// POST /api/mealplan/generate
router.post("/meal-plan", generateMealPlan);


export default router;
