import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";
import toast from "react-hot-toast";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    bloodType: "",
    bloodBank: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    toast.success("Signup functionality will be implemented soon");
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex items-center justify-center mb-8">
        <Droplet className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold ml-2">Join Blood Bank Connect</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
          >
            <option value="donor">Donor</option>
            <option value="manager">Blood Bank Manager</option>
          </select>
        </div>

        {formData.role === "donor" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Type
            </label>
            <select
              value={formData.bloodType}
              onChange={(e) =>
                setFormData({ ...formData, bloodType: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        )}

        {formData.role === "manager" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Bank
            </label>
            <select
              value={formData.bloodBank}
              onChange={(e) =>
                setFormData({ ...formData, bloodBank: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
            >
              <option value="">Select Blood Bank</option>
              <option value="bb1">Blood Bank 1 - North Coimbatore</option>
              <option value="bb2">Blood Bank 2 - South Coimbatore</option>
              <option value="bb3">Blood Bank 3 - East Coimbatore</option>
              <option value="bb4">Blood Bank 4 - West Coimbatore</option>
              <option value="bb5">Blood Bank 5 - Central Coimbatore</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};
export default Signup;