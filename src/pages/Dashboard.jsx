import React from "react";
import { useNavigate } from "react-router-dom";
import AppWrapper from "../components/AppWrapper.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <div className="max-w-6xl w-full flex flex-col gap-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Collab Hub</h1>
          <p className="text-gray-600 mb-4">Collaborate, code, and stay productive.</p>
          <button
            onClick={() => navigate("/workspace")}
            className="bg-blue-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-600 transition"
          >
            Go to Workspace
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Your Projects" description="View and manage your coding projects." />
          <Card title="Recent Activity" description="Check recent edits and activity from collaborators." />
          <Card title="Collaboration" description="Invite teammates and share code in real-time." />
          <Card title="Settings" description="Adjust your profile, preferences, and notifications." />
        </div>
      </div>
    </AppWrapper>
  );
};

<div className="bg-red-500 text-white p-4 rounded">
  Tailwind is working!
</div>


const Card = ({ title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition cursor-pointer">
    <h2 className="font-bold text-xl mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Dashboard;
