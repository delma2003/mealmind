import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const token = res.token;

      if (token) {
        localStorage.setItem("token", res.token);
        alert("Login successful!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("🔴 Login error:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Login failed.");
      } else {
        alert("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
    <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Welcome Back</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        placeholder="Email"
        type="email"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-200"
      >
        Sign In
      </button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-600">
      Don’t have an account?{' '}
      <a href="/register" className="text-indigo-600 hover:underline">Sign up here</a>
    </p>
  </div>
</div>
  )
};

export default Login;
