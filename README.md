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
https://private-user-images.githubusercontent.com/108217741/477134570-281e67aa-f790-43e8-803c-9d37d4504a74.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUwMTMwNTksIm5iZiI6MTc1NTAxMjc1OSwicGF0aCI6Ii8xMDgyMTc3NDEvNDc3MTM0NTcwLTI4MWU2N2FhLWY3OTAtNDNlOC04MDNjLTlkMzdkNDUwNGE3NC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgxMlQxNTMyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00NGU0NzUwODRmZGFhZGE5M2MxZTM5NTg4OGE3NDU3ZGJiNGUzZjI2NDFhMjc0NzI5ZGJkN2ZkNDUxMzU2YmRmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.zBzAaXQv8zyNm-dWOq8346jCJoaFWpOHdZ14DP4U7FY

### 🏠 Dashboard
https://private-user-images.githubusercontent.com/108217741/477134665-15c4babd-5511-4c6f-95bc-0d9bafc59819.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUwMTMwNTksIm5iZiI6MTc1NTAxMjc1OSwicGF0aCI6Ii8xMDgyMTc3NDEvNDc3MTM0NjY1LTE1YzRiYWJkLTU1MTEtNGM2Zi05NWJjLTBkOWJhZmM1OTgxOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgxMlQxNTMyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYjgwNTMyYzg0NzgxOWU2MDk5YmQ2NTRkNzAzMDg3Nzc2MDFlZjg1OWQ1YzQxNmY2ZDZiZjk0MzNkNWNkYmU4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.VSXvgbw5Mo4RPn03bFl9cH-PBSHEA2e5i3nQriF5GhY

### 🔐 Login Page
https://private-user-images.githubusercontent.com/108217741/477134449-c872e752-3ca7-49b8-b734-d4f09d58c8d8.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUwMTMwNTksIm5iZiI6MTc1NTAxMjc1OSwicGF0aCI6Ii8xMDgyMTc3NDEvNDc3MTM0NDQ5LWM4NzJlNzUyLTNjYTctNDliOC1iNzM0LWQ0ZjA5ZDU4YzhkOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgxMlQxNTMyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iZjM2ZTI1MmJkZWU4MGNlYjg1ZmY5MGRmOTIwNDgwYzA2Y2YwOTUzZTY1OWZkN2U2YzhiMjFiMmM5ZGJiYjViJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.zP5jGpeAGamfLAWLy9dI2fowTRxay0B2McsnzXkNVhQ

### 🍽 Generated Meal Plan
https://private-user-images.githubusercontent.com/108217741/477134787-86a3a193-a412-4676-804c-f56805f2f3c7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUwMTMwNTksIm5iZiI6MTc1NTAxMjc1OSwicGF0aCI6Ii8xMDgyMTc3NDEvNDc3MTM0Nzg3LTg2YTNhMTkzLWE0MTItNDY3Ni04MDRjLWY1NjgwNWYyZjNjNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgxMlQxNTMyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xOGMzNWY1MjI5NTgzMDVlMmNhMmRkNWU3MDA4NmZmYjY4ZDBlY2Q0MzVlNWVjNDVmZTdiNjM0YmI0NWU3OTQ5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.E_mNyWZFkiPf6rM-y6efr6884wnOiOXIdTbN0S1x7Vw





📜 License
MIT

Made with ❤️ by Delma Johnson