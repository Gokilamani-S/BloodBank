import React, { useState } from 'react';
import { Building2, Users, AlertCircle, ArrowLeftRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

import { useNavigate } from 'react-router-dom';

export const ManagerDashboard = () => {
  const authStore = useAuthStore();
  const [showRequestForm, setShowRequestForm] = useState(false);

   const navigate = useNavigate(); // Use useNavigate for navigation
    const logout = () => {
      navigate('/'); 
    };
    
  const bloodInventory = [
    { type: 'A+', units: 15 },
    { type: 'A-', units: 8 },
    { type: 'B+', units: 12 },
    { type: 'B-', units: 6 },
    { type: 'AB+', units: 4 },
    { type: 'AB-', units: 2 },
    { type: 'O+', units: 20 },
    { type: 'O-', units: 10 },
  ];

  const recentTransfers = [
    { date: '2024-03-15', from: 'Blood Bank 1 - North', to: 'Blood Bank 2 - South', type: 'A+', units: 2 },
    { date: '2024-03-14', from: 'Blood Bank 3 - East', to: 'Blood Bank 1 - North', type: 'O-', units: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blood Bank Dashboard</h1>
            <p className="text-gray-600">{authStore.user && authStore.user.bloodBank}</p>
          </div>
          <button onClick={logout} className="text-red-600 hover:text-red-800">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blood Inventory */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Blood Inventory</h2>
            </div>
            <button onClick={() => setShowRequestForm(true)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Request Blood
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bloodInventory.map((blood) => (
              <div key={blood.type} className="border rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold text-red-600">{blood.type}</h3>
                <p className="text-gray-600">{blood.units} units</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Donors */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold">Available Donors</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>A+ Donors:</span> <span className="font-semibold">8 available</span>
            </div>
            <div className="flex justify-between items-center">
              <span>O- Donors:</span> <span className="font-semibold">5 available</span>
            </div>
            <div className="flex justify-between items-center">
              <span>B+ Donors:</span> <span className="font-semibold">6 available</span>
            </div>
          </div>
        </div>

        {/* Recent Transfers */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <ArrowLeftRight className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold">Recent Transfers</h2>
          </div>
          <div className="space-y-4">
            {recentTransfers.map((transfer, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="font-semibold">{transfer.from} → {transfer.to}</p>
                <p className="text-sm text-gray-600">{transfer.units} units of {transfer.type}</p>
                <span className="text-xs text-gray-500">{transfer.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Requests */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold">Urgent Requests</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h3 className="font-semibold">Need O- Blood</h3>
              <p className="text-sm text-gray-600">Blood Bank 3 - East</p>
              <span className="text-xs text-gray-500">30 minutes ago</span>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-semibold">Low on AB+ Stock</h3>
              <p className="text-sm text-gray-600">Blood Bank 4 - West</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </main>

      {/* Blood Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Request Blood</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300">
                  <option>Select Blood Type</option>
                  {bloodInventory.map((blood) => (
                    <option key={blood.type} value={blood.type}>{blood.type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Units Required</label>
                <input type="number" min="1" className="mt-1 block w-full rounded-md border-gray-300" />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setShowRequestForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManagerDashboard;