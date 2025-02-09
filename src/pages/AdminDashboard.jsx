import React, { useEffect, useState } from 'react';
import { Building2, TrendingUp, FileText } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import jsPDF from 'jspdf';

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  
  const [bloodBanks, setBloodBanks] = useState([]);
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/bloodBanks')
      .then(res => res.json())
      .then(data => setBloodBanks(data))
      .catch(error => console.error('Error fetching blood banks:', error));

    fetch('/api/recentTransfers')
      .then(res => res.json())
      .then(data => setRecentTransfers(data))
      .catch(error => console.error('Error fetching transfers:', error));
  }, []);

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Blood Bank Weekly Report', 20, 20);
    doc.text('Total Blood Banks: 5', 20, 40);
    doc.text('Total Donors: 210', 20, 60);
    doc.text('Total Units: 548', 20, 80);
    doc.save('weekly-report.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={logout} className="text-red-600 hover:text-red-800">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Statistics Overview */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 flex justify-between">
              <div>
                <p className="text-gray-500">Total Blood Banks</p>
                <h3 className="text-3xl font-bold">5</h3>
              </div>
              <Building2 className="h-8 w-8 text-red-500" />
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex justify-between">
              <div>
                <p className="text-gray-500">Total Donors</p>
                <h3 className="text-3xl font-bold">210</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex justify-between">
              <div>
                <p className="text-gray-500">Total Units</p>
                <h3 className="text-3xl font-bold">548</h3>
              </div>
              <FileText className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button onClick={generateReport} className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Generate Weekly Report
              </button>
              <button onClick={() => setShowModal(true)} className="w-full bg-white text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50">
                Add New Blood Bank
              </button>
            </div>
          </div>

          {/* Blood Banks List */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Blood Banks Overview</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Donors</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Units</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bloodBanks.map((bank) => (
                    <tr key={bank.id}>
                      <td className="px-6 py-4">{bank.name}</td>
                      <td className="px-6 py-4">{bank.location}</td>
                      <td className="px-6 py-4">{bank.totalDonors}</td>
                      <td className="px-6 py-4">{bank.totalUnits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Transfers */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Blood Transfers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentTransfers.map((transfer, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{transfer.from} → {transfer.to}</p>
                      <p className="text-sm text-gray-600">{transfer.units} units of {transfer.type}</p>
                    </div>
                    <span className="text-xs text-gray-500">{transfer.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Blood Bank Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add Blood Bank</h2>
            {/* Form Fields */}
            <button onClick={() => setShowModal(false)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
