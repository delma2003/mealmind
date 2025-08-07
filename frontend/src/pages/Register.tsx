import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    diet: 'veg',
    calorieTarget: 2000,
    allergies: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'calorieTarget' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      preferences: {
        diet: formData.diet,
        calorieTarget: formData.calorieTarget,
        allergies: formData.allergies.split(',').map((a) => a.trim()),
      },
    };

    try {
      const res = await registerUser(userPayload);
      localStorage.setItem("token", res.token);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Registration failed.");
      } else {
        alert("Unexpected error occurred.");
      }
    }
  };

  return (
  <div className="w-screen h-screen bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 flex items-center justify-center">
    <div className="w-full max-w-6xl h-[90%] bg-white flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden">

      {/* Left Panel */}
      <div className="md:w-1/2 bg-gradient-to-b from-orange-500 to-yellow-400 text-white flex flex-col items-center justify-center p-10 space-y-6">
        <div className="text-6xl font-bold rotate-90 md:rotate-0">→</div>
        <h2 className="text-3xl font-bold">HI</h2>
        <p className="text-white/90 text-center text-sm">
          Welcome to Mealmind Planner
        </p>
        <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-100">
          Register
        </button>
      </div>

      {/* Right Panel (Register Form) */}
      <div className="md:w-1/2 bg-white p-10 rounded-l-[4rem] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Register Here</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email Address"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="diet"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.diet}
            onChange={handleChange}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
          <input
            name="calorieTarget"
            placeholder="Calorie Target (e.g. 2000)"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.calorieTarget}
            onChange={handleChange}
          />
          <input
            name="allergies"
            placeholder="Allergies (comma-separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.allergies}
            onChange={handleChange}
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-orange-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

    </div>
  </div>
);

}

export default Register;
