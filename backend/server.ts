import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db'; // adjust path based on your server.ts location
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';
import mealRoutes from './src/routes/mealRoutes';
import mealPlanRoutes from "./src/routes/mealPlanRoutes";



dotenv.config();
console.log('🧪 Testing ENV - GROQ_API_KEY:', !!process.env.GROQ_API_KEY);

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); // ✅ Add this
app.use('/api/auth', authRoutes);
app.use('/api/meal', mealRoutes);
app.use("/api/mealplan", mealPlanRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  

});
