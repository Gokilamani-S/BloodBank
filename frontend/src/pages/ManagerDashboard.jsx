import React, { useState, useEffect } from "react";

const ManagerDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodBank, setBloodBank] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false); 
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [requestedUnits, setRequestedUnits] = useState(1); 

  useEffect(() => {
    const savedBank = localStorage.getItem("loggedInBank");
    if (savedBank) {
      setBloodBank(JSON.parse(savedBank));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

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

      const foundBank = formattedData.find(
        (bank) => bank.Email === email && email.split("@")[0] === password
      );

      if (!foundBank) {
        setError("Invalid login credentials.");
        return;
      }

      // Store session
      localStorage.setItem("loggedInBank", JSON.stringify(foundBank));
      setBloodBank(foundBank);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login error:", err);
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInBank");
    setBloodBank(null);
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleRequestModalOpen = () => {
    setShowRequestModal(true); 
  };

  const handleRequestModalClose = () => {
    setShowRequestModal(false);
  };

  const handleRequestSubmit = async () => {
    if (!selectedBloodGroup || !requestedUnits) {
      alert("Please select a blood group and specify units.");
      return;
    }
  
   
    const bloodBankContact = bloodBank["Contact No"] ? `+91${bloodBank["Contact No"].trim()}` : "Unknown";
  

    const message = `🚨 Blood Request Alert 🚨
  Blood Bank: ${bloodBank["Blood Bank Name"]}
  Blood Group: ${selectedBloodGroup}
  Units Required: ${requestedUnits}
  Location: ${bloodBank.City}, ${bloodBank.State}
  📍 Address: ${bloodBank.Address}
  📞 Contact: ${bloodBankContact}`;
  
    console.log("Sending message:", message);
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("token", "jqhhd9x9unimsh28");
  

    urlencoded.append("to", "+919345395818,+919976591083");
  
    urlencoded.append("body", message);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://api.ultramsg.com/instance107648/messages/chat",
        requestOptions
      );
      const result = await response.text();
      console.log("Message sent successfully:", result);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-red-700 mb-6">
        Blood Bank Manager Dashboard
      </h1>

      {!isLoggedIn ? (
        <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-red-600">
            Manager Login
          </h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <input
            type="password"
            placeholder="Enter Password (first part of email)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      ) : (
        <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-red-600">
            {bloodBank["Blood Bank Name"]}
          </h2>
          <p className="text-gray-700 text-center mb-4">
            {bloodBank.Address}, {bloodBank.City}, {bloodBank.State} - {bloodBank.Pincode}
          </p>
          <p className="text-gray-700 text-center mb-4">
            <strong>Contact:</strong> {bloodBank["Contact No"]} | <strong>Email:</strong>{" "}
            {bloodBank.Email}
          </p>

          <h3 className="text-xl font-semibold text-center mb-2 text-red-600">
            Blood Availability
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="border border-gray-300 p-3">Blood Group</th>
                  <th className="border border-gray-300 p-3">Available Units</th>
                </tr>
              </thead>
              <tbody>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                  <tr key={group} className="text-center hover:bg-gray-100 transition-all">
                    <td className="border border-gray-300 p-3">{group}</td>
                    <td className="border border-gray-300 p-3 font-bold text-red-600">
                      {bloodBank[group] || 0} units
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleRequestModalOpen}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Request Blood
          </button>

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}

      {showRequestModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-center mb-4 text-red-600">
              Blood Request Form
            </h2>
            <div>
              <p><strong>Blood Bank Name:</strong> {bloodBank["Blood Bank Name"]}</p>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Select Blood Group:</label>
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Units Required:</label>
                <input
                  type="number"
                  value={requestedUnits}
                  onChange={(e) => setRequestedUnits(e.target.value)}
                  min="1"
                  className="w-full border-gray-300 p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleRequestSubmit}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Submit Request
                </button>
                <button
                  onClick={handleRequestModalClose}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;