import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UserPage = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const showAuthButtons = location.pathname !== "/user"; 

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setBloodBanks([]);

    try {
      const response = await fetch("/bloodbanks.json");
      if (!response.ok) throw new Error("Failed to load data");

      const data = await response.json();

      const formattedData = data.map((bank) => {
        const cleanedBank = {};
        Object.keys(bank).forEach((key) => {
          cleanedBank[key.trim()] = bank[key];
        });
        return cleanedBank;
      });

      const filtered = formattedData.filter(
        (bank) =>
          bank.State?.trim().toLowerCase() === state.trim().toLowerCase() &&
          bank.District?.trim().toLowerCase() === district.trim().toLowerCase() &&
          bank[bloodGroup] > 0
      );

      setBloodBanks(filtered);
      setError(filtered.length ? null : "No matching blood banks found.");
    } catch (err) {
      console.error("Error fetching blood bank data:", err);
      setError("Error loading data. Please check the JSON file path.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-red-600 text-white py-4 px-8 flex justify-between items-center w-full shadow-md">
  <h1 className="text-3xl font-bold tracking-wide">ZARA</h1>
  <div>
  <Link
      to="/manager-dashboard"
      className="mx-2 px-5 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-200 transition"
    >
      Manager
    </Link>
    <Link
      to="/login"
      className="mx-2 px-5 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-200 transition"
    >
      Login
    </Link>
    <Link
      to="/signup"
      className="mx-2 px-5 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-200 transition"
    >
      Register
    </Link>
  </div>
</nav>


      <div className="flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Blood Availability Checker</h1>

        <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <input
            type="text"
            placeholder="Enter District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <button
            onClick={handleSearch}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

        {bloodBanks.length > 0 && (
          <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 text-red-600">Available Blood Banks</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="border border-gray-300 p-3">Blood Bank Name</th>
                    <th className="border border-gray-300 p-3">Address</th>
                    <th className="border border-gray-300 p-3">Contact No</th>
                    <th className="border border-gray-300 p-3">Available Units</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodBanks.map((bank, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-100 transition-all">
                      <td className="border border-gray-300 p-3">{bank["Blood Bank Name"] || "N/A"}</td>
                      <td className="border border-gray-300 p-3">{bank.Address || "No address available"}</td>
                      <td className="border border-gray-300 p-3">{bank["Contact No"] || "Not available"}</td>
                      <td className="border border-gray-300 p-3 font-bold text-red-600">{bank[bloodGroup] || 0} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
