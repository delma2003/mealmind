# 🍽️ MealMind – Smart Diet & Meal Plan Generator

MealMind is an AI-powered MERN stack website that generates personalized weekly meal plans based on your dietary preferences, allergies, calorie goals, and even ingredients you already have. With real-time nutrition data and a beautiful responsive dashboard, it helps you stay healthy, save time, and reduce food waste.

## 🌟 Features

- 🧠 AI-generated weekly meal plans using [Groq's LLaMA3-70B](https://groq.com/)
- 🍏 Nutrition info from Spoonacular API (calories, protein, fat, carbs)
- ✅ Supports vegetarian, vegan, keto, and more
- 🔍 Ingredient checklist and custom input
- 📱 Fully responsive dashboard UI with Tailwind CSS
- 🔐 JWT authentication (login/signup)

## 🔧 Tech Stack

| Frontend | Backend | AI & APIs |
|---------|---------|-----------|
| React + TypeScript | Node.js + Express | Groq LLaMA3-70B |
| Vite | MongoDB Atlas | Spoonacular API |
| Tailwind CSS v4 | JWT Auth |  |

## 🚀 Getting Started

### 📦 Clone the repo

```bash
git clone https://github.com/delma2003/mealmind.git
cd mealmind
🖥️ Backend Setup
bash


cd backend
npm install
npm run dev
🌐 Frontend Setup
bash


cd frontend
npm install
npm run dev
⚙️ Environment Variables
Create a .env in /backend:

env


GROQ_API_KEY=your_groq_api_key
SPOONACULAR_API_KEY=your_spoonacular_key
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_uri
## 📸 Screenshots

### 📝 Register
<img width="1882" height="904" alt="Image" src="https://github.com/user-attachments/assets/c872e752-3ca7-49b8-b734-d4f09d58c8d8" />

### 🏠 Dashboard
<img width="1910" height="910" alt="Image" src="https://github.com/user-attachments/assets/281e67aa-f790-43e8-803c-9d37d4504a74" />

### 🔐 Login Page
<img width="1882" height="884" alt="Image" src="https://github.com/user-attachments/assets/15c4babd-5511-4c6f-95bc-0d9bafc59819" />

### 🍽 Generated Meal Plan
<img width="1864" height="916" alt="Image" src="https://github.com/user-attachments/assets/86a3a193-a412-4676-804c-f56805f2f3c7" />





📜 License
MIT

Made with ❤️ by Delma Johnson