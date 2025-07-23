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
    console.log('Meal Plan:', planText);
    console.log('Used fallback?', usedFallback);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6 w-full max-w-full">

      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md p-6 rounded-2xl mb-6 border w-full">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          🏠 Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow"
        >
          Logout
        </button>
      </header>

      {/* Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-screen-2xl mx-auto">

        {/* User Info */}
        <section className="bg-white rounded-2xl shadow-md p-6 border w-full">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">👤 User Info</h2>
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
        </section>

        {/* Meal Planner */}
        <section className="bg-white rounded-2xl shadow-md p-6 border w-full">
          <MealPlanner onPlanGenerated={handlePlanReceived} />
        </section>

        {/* Meal Plan Cards */}
        {dashboardMealPlan && (
          <section className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              📋 Latest Meal Plan
            </h3>
            {dashboardFallback && (
              <p className="text-yellow-600 text-sm mb-2">(Fallback plan used due to AI issue.)</p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardMealPlan
                .split(/\*\*Day \d+\*\*/g)
                .filter(Boolean)
                .map((dayContent, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-green-50 border border-green-300 p-4 rounded-xl shadow"
                  >
                    <h4 className="text-lg font-bold text-green-700 mb-2">
                      Day {idx + 1}
                    </h4>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-mono">
                      {dayContent.trim()}
                    </pre>
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
