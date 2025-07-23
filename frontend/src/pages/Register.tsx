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
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg border rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
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

        <select
          name="diet"
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
          value={formData.calorieTarget}
          onChange={handleChange}
        />

        <input
          name="allergies"
          placeholder="Allergies (comma-separated)"
          className="w-full p-2 border rounded"
          value={formData.allergies}
          onChange={handleChange}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
