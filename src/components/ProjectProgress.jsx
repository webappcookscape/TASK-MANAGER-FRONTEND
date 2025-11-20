import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const ProjectProgress = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;
  const percentage = Math.round((completed / total) * 100);

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#16a34a", "#fbbf24"]; // green, yellow

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">Project Overview</h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <p className="text-sm mb-1">Overall Progress</p>

        <div className="w-full bg-gray-200 h-20 rounded">
          <div
            className="bg-indigo-600 h-20 rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-sm mt-1 text-gray-600">{percentage}% completed</p>
      </div>

      {/* Stats + Pie Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Left Stats */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-semibold">Tasks Completed</h3>
            <p className="text-3xl font-bold text-green-600">{completed}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-semibold">Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600">{pending}</p>
          </div>
        </div>

        {/* Pie Chart with fixed height */}
        <div className="w-full" style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name }) => name}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
