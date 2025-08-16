"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./src/config/db")); // adjust path based on your server.ts location
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const mealRoutes_1 = __importDefault(require("./src/routes/mealRoutes"));
const mealPlanRoutes_1 = __importDefault(require("./src/routes/mealPlanRoutes"));
dotenv_1.default.config();
console.log('🧪 Testing ENV - GROQ_API_KEY:', !!process.env.GROQ_API_KEY);
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default); // ✅ Add this
app.use('/api/auth', authRoutes_1.default);
app.use('/api/meal', mealRoutes_1.default);
app.use("/api/mealplan", mealPlanRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
