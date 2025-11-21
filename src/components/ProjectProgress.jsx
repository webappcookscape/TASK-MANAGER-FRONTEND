import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";   // ✅ IMPORTANT: Import your component
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const ProjectProgress = ({ tasks = [] }) => {

  const [showTaskList, setShowTaskList] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;

  const targetPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  /* ============ 45 DAY DATA ============ */
  const TOTAL_DAYS = 45;
  const daysPassed = 20;
  const daysLeft = TOTAL_DAYS - daysPassed;
  const daysPercentage = Math.round((daysPassed / TOTAL_DAYS) * 100);

  const [percentage, setPercentage] = useState(0);
  const [dayProgress, setDayProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start++;
      if (start <= targetPercentage) setPercentage(start);
      else clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [targetPercentage]);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start++;
      if (start <= daysPercentage) setDayProgress(start);
      else clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [daysPercentage]);

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#f97316"];

  const client = {
    name: "Sathish Rajendhiran Guest House-Alandur",
  };

  /* ============ TASK FILTER ============ */
  const filteredTasks = tasks.filter(task => task.status === selectedStatus);

  /* ============ IF TASKLIST VIEW ============ */
  if (showTaskList) {
    return (
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => setShowTaskList(false)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          ← Back to Dashboard
        </button>

        {/* Show your actual tasklist component */}
        <TaskList tasks={filteredTasks} />
      </div>
    );
  }

  /* ============ NORMAL DASHBOARD VIEW ============ */
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, <span className="text-indigo-600">{client.name}</span>
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Here is the latest update on your project.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-10">
        <p className="text-lg mb-3 font-semibold text-gray-700">
          Overall Progress
        </p>

        <div className="relative w-full bg-gray-300 h-12 rounded-xl overflow-hidden">

          <div
            className="smooth-bar arrow-bar absolute top-0 left-0 h-full"
            style={{ width: `${Math.max(percentage, 2)}%` }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
              {percentage}%
            </span>
          </div>

        </div>
      </div>

      {/* 45 Day Timeline */}
      <div className="mb-10">
        <p className="text-lg mb-3 font-semibold text-gray-700">
          45-Day Timeline
        </p>

        <div className="relative w-full bg-gray-300 h-8 rounded-xl overflow-hidden">

          <div
            className="timeline-bar arrow-bar absolute top-0 left-0 h-full"
            style={{ width: `${Math.max(dayProgress, 2)}%` }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {dayProgress}%
            </span>
          </div>

        </div>

        <p className="text-sm text-gray-600 mt-2">
          {daysLeft} days remaining out of {TOTAL_DAYS} days
        </p>
      </div>

      {/* STATS + PIE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="space-y-5">

          {/* COMPLETED CARD */}
          <div
            onClick={() => {
              setSelectedStatus("completed");
              setShowTaskList(true);
            }}
            className="bg-gray-50 p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-gray-700">
              Stages Completed
            </h3>
            <p className="text-4xl font-extrabold text-green-600">
              {completed}
            </p>
          </div>

          {/* PENDING CARD */}
          <div
            onClick={() => {
              setSelectedStatus("pending");
              setShowTaskList(true);
            }}
            className="bg-gray-50 p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-gray-700">
              Pending Stages
            </h3>
            <p className="text-4xl font-extrabold text-orange-500">
              {pending}
            </p>
          </div>

        </div>

        {/* PIE */}
        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Deliverables Status
          </h3>

          <div style={{ height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Styles */}
      <style>
        {`
        .arrow-bar {
  clip-path: polygon(
    0 0,
    calc(100% - 12px) 0,
    100% 50%,
    calc(100% - 12px) 100%,
    0 100%
  );
}

/* ================= BAR ANIMATION FIX ================= */

/* OVERALL PROGRESS BAR */
.smooth-bar {
  background: linear-gradient(
    90deg,
    #4f46e5,
    #7c3aed,
    #ec4899,
    #2588e4ff,
    #4f46e5
  );
  background-size: 400% 400%;
  animation:
    progressFlow 6s ease-in-out infinite,
    smoothGrow 1.1s ease forwards,
    barPulse 2.5s ease-in-out infinite;
}

/* 45 DAY TIMELINE BAR */
.timeline-bar {
  background: linear-gradient(
    90deg,
    #ff0000,
    #f73636ff,
    #84ff25ff,
    #00ff04ff
  );
  background-size: 400% 400%;
  animation:
    progressFlow 6s linear infinite,
    smoothGrow 1.1s ease forwards,
    timelineGlow 2.2s ease-in-out infinite;
}

/* Moving Gradient */
@keyframes progressFlow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Bar Grow */
@keyframes smoothGrow {
  from { width: 0%; }
}

/* Overall bar breathing */
@keyframes barPulse {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.15); }
  100% { filter: brightness(1); }
}

/* Timeline glow */
@keyframes timelineGlow {
  0% { box-shadow: 0 0 6px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 14px rgba(255,255,255,0.5); }
  100% { box-shadow: 0 0 6px rgba(255,255,255,0.2); }
}

/* GLOW DOT */
.soft-glow {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  background: radial-gradient(circle,
    rgba(255,255,255,0.9),
    transparent
  );
  border-radius: 50%;
  filter: blur(6px);
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
}

        `}
      </style>
    </div>
  );
};

export default ProjectProgress;
