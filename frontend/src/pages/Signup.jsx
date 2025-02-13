import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";
import toast from "react-hot-toast";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "donor",
    bloodType: "",
    bloodBank: "",
    lastDonation: "",
    locationPermission: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Signup successful!");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error connecting to the server.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex items-center justify-center mb-8">
        <Droplet className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold ml-2">Join Blood Bank Connect</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
          <p className="text-xs text-gray-500">Use a strong password with uppercase, lowercase, numbers & symbols.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500">
            <option value="donor">Donor</option>
            <option value="manager">Blood Bank Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {formData.role === "donor" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Type</label>
              <select value={formData.bloodType} onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500">
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Last Blood Donation</label>
              <input type="date" value={formData.lastDonation} onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
            </div>

            <div className="flex items-center">
              <input type="checkbox" checked={formData.locationPermission} onChange={(e) => setFormData({ ...formData, locationPermission: e.target.checked })} className="mr-2" />
              <label className="text-sm text-gray-700">Allow location access always</label>
            </div>
          </>
        )}

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-red-500">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
