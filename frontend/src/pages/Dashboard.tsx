// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import MealPlanner from '../components/MealPlanner';

type UserType = {
  name: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  const [dashboardMealPlan, setDashboardMealPlan] = useState<string | null>(null);
  const [dashboardFallback, setDashboardFallback] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get<UserType>('/api/users/me');
        setUser(res.data);
      } catch (err: unknown) {
        console.error('Error fetching user info:', err);
        setUserError('Unable to fetch user info. Please log in again.');
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handlePlanReceived = (planText: string, usedFallback: boolean) => {
    setDashboardMealPlan(planText);
    setDashboardFallback(usedFallback);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 w-full font-sans">

      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-lg p-6 rounded-3xl mb-8 border border-pink-100">
        <h1 className="text-4xl font-extrabold text-purple-700 flex items-center gap-3">
          🏡 <span>Dashboard</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md"
        >
          Logout
        </button>
      </header>

      {/* Main Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl mx-auto">

        {/* User Info Card */}
        <section className="bg-white border border-violet-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
            👤 User Info
          </h2>
          {loadingUser ? (
            <p className="text-gray-500">Loading user info...</p>
          ) : userError ? (
            <p className="text-red-600">{userError}</p>
          ) : user ? (
            <div className="grid sm:grid-cols-2 gap-4 text-gray-800 text-lg">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <p className="text-gray-500">No user info found.</p>
          )}
          {/* ✅ Add this image below */}
  <div className="mt-6">
    <img
      src="/assets/mealplanner.jpg" // place your image in public/assets
      alt="Meal planning illustration"
      className="w-full rounded-lg shadow-md"
    />
  </div>
        </section>

        {/* Meal Planner Card */}
        <section className="bg-white border border-teal-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
            🍽️ Smart Meal Planner
          </h2>
          <MealPlanner onPlanGenerated={handlePlanReceived} />
        </section>

        {/* 🌟 Meal Plan Results – Redesigned */}
        {dashboardMealPlan && (
          <section className="col-span-1 lg:col-span-2 w-full mt-6">
            <h3 className="text-4xl font-extrabold text-center text-purple-600 mb-10 drop-shadow">
              📋 Your Personalized 7-Day Meal Plan
            </h3>

            {dashboardFallback && (
              <p className="text-yellow-700 text-center font-medium mb-6">
                ⚠️ Fallback plan used due to AI issue.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
              {dashboardMealPlan
                .split(/\*\*Day \d+\*\*/g)
                .filter(Boolean)
                .map((dayContent, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-6 shadow-lg bg-white/80 backdrop-blur-md border hover:scale-[1.02] transition-transform duration-300
                      ${idx % 3 === 0
                        ? 'border-pink-200'
                        : idx % 3 === 1
                          ? 'border-purple-200'
                          : 'border-blue-200'}
                    `}
                  >
                    <h4 className="text-xl font-bold text-pink-700 mb-4 text-center">
                      🌞 Day {idx + 1}
                    </h4>

                    <div className="text-gray-700 text-sm space-y-2 leading-relaxed whitespace-pre-wrap">
                      {dayContent.trim().split('\n').map((line, lineIdx) => (
                        <p key={lineIdx} className="flex items-start gap-2">
                          <span className="text-pink-500">🍴</span>
                          <span>{line}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
