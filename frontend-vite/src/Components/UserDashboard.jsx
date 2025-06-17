import React from "react";
import {
  FaHeartbeat,
  FaChartBar,
  FaComments,
  FaPlusCircle,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetch("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.name);
        });
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">MediBot</h2>
        <ul className="space-y-4">
          <li className="text-gray-800 hover:text-blue-600 cursor-pointer">
            🧾 My History
          </li>
          <li className="text-gray-800 hover:text-blue-600 cursor-pointer">
            💬 Saved Advice
          </li>
          <li className="text-gray-800 hover:text-blue-600 cursor-pointer">
            ⚙️ Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome, {username} 👋
          </h1>
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            <FaPlusCircle /> New Chat
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Recent Chats */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FaComments /> Recent Chats
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>🗓️ 03 Jun – Headache and nausea</li>
              <li>🗓️ 31 May – Cough & fever</li>
              <li>🗓️ 29 May – Back pain</li>
            </ul>
          </div>

          {/* Symptom Trends */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FaChartBar /> Symptom Trends
            </h2>
            <p className="text-gray-600">
              You reported headache 3 times last week.
            </p>
            <p className="text-gray-600">Common trend: Fatigue, Cough</p>
          </div>

          {/* Tips */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FaHeartbeat /> Health Tips
            </h2>
            <ul className="text-gray-700 list-disc pl-5">
              <li>Stay hydrated – drink 2–3L of water daily.</li>
              <li>Get 7–8 hours of sleep.</li>
              <li>Monitor recurring symptoms.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
