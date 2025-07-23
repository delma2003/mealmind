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
      const res = await loginUser(formData); // Calling backend API via service
      const token = res.token;

      if (token) {
        localStorage.setItem("token", res.token); // ✅ Correct
 // Save JWT token
        alert("Login successful!");
        navigate('/dashboard'); // Redirect after login
      }
    } catch (error) {
  console.error("🔴 Login error:", error); // 👈 Add this line
  if (axios.isAxiosError(error)) {
    alert(error.response?.data?.message || "Login failed.");
  } else {
    alert("Unexpected error occurred.");
  }
}

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg border rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
