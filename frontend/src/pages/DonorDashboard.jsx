import React, { useEffect, useState } from "react";
import { Bell, Heart, Newspaper } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DonorDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [healthNews, setHealthNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    navigate("/");
  };

  // ✅ Fetch Health News from API
  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const res = await axios.get(
          "https://newsdata.io/api/1/news?apikey=pub_6858174c15f244ac96d74780b17e72da9806e&q=medical&country=in&language=en&category=health"
        );
        setHealthNews(res.data.results); // Store news in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching health news:", error);
        setLoading(false);
      }
    };
    fetchHealthNews();
  }, []);

  const notifications = [
    {
      title: "Urgent A+ Blood Required",
      hospital: "Blood Bank 2 - South Coimbatore",
      time: "2 hours ago",
    },
    {
      title: "You're Eligible to Donate",
      message: "It's been 3 months since your last donation",
      time: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <button onClick={logout} className="text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donation Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Your Donation Status</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Blood Type:</span>
                <span className="font-semibold">{user?.bloodType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Donation:</span>
                <span className="font-semibold">
                  {user?.lastDonation
                    ? new Date(user.lastDonation).toLocaleDateString()
                    : "No donations yet"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Next Eligible Date:</span>
                <span className="font-semibold text-green-600">2024-06-15</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-red-600">{notification.title}</h3>
                  <p className="text-sm text-gray-600">
                    {notification.hospital || notification.message}
                  </p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health News with API Data */}
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <div className="flex items-center mb-4">
              <Newspaper className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Latest Health News</h2>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading news...</p>
            ) : (
              <div className="space-y-6">
                {healthNews.length > 0 ? (
                  healthNews.map((news, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                    >
                      {/* ✅ Use API image if available, else show default */}
                      <img
                        src={
                          news.image_url
                            ? news.image_url
                            : "https://source.unsplash.com/400x250/?health,medical"
                        }
                        alt={news.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{news.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {news.description || "Click to read more"}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {news.pubDate}
                        </span>
                        {/* ✅ Read More Button */}
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-red-600 hover:underline text-sm"
                        >
                          Read More →
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No news available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
