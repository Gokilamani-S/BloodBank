import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplet } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      localStorage.setItem("role", "admin");
      navigate("/admin-dashboard");
      toast.success("Admin login successful!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Server Response:", res.data);

      if (res.status === 200) {
        localStorage.setItem("email", formData.email); 

    
        navigate("/donor-dashboard");
        toast.success("Login successful!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex items-center justify-center mb-8">
        <Droplet className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold ml-2">Blood Bank Connect</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-red-600 hover:text-red-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
