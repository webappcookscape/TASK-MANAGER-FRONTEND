import React, { useEffect, useState } from "react";
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

  const targetPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);
// 45 Days Progress Dummy Data
const TOTAL_DAYS = 45;
const daysPassed = 20; // change this later
const daysLeft = TOTAL_DAYS - daysPassed;

const daysPercentage = Math.round((daysPassed / TOTAL_DAYS) * 100);
const overdueDays = daysPassed > TOTAL_DAYS 
  ? daysPassed - TOTAL_DAYS 
  : 0;

// Animation state for day progress bar
const [dayProgress, setDayProgress] = useState(0);

useEffect(() => {
  let start = 0;
  const interval = setInterval(() => {
    start += 1;
    if (start <= daysPercentage) setDayProgress(start);
    else clearInterval(interval);
  }, 15);
  return () => clearInterval(interval);
}, [daysPercentage]);

  // Animated counter
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start <= targetPercentage) setPercentage(start);
      else clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [targetPercentage]);

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];
  const client = {
  name: "Gopinath Guest House-Alandur",
};

  const COLORS = ["#22c55e", "#f97316"]; // green, orange

  return (
<div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
      
    {/* Professional greeting */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Welcome back, <span className="text-indigo-600">{client.name}</span>
      </h1>
      <p className="text-gray-600 mt-1 text-sm">
        Here is the latest update on your project.
      </p>
    </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">
        Project Overview
      </h2>

      {/* Progress Bar */}
<div className="mb-10">
  <p className="text-lg mb-3 font-semibold text-gray-700">Overall Progress</p>

  <div className="relative w-full bg-gray-300 h-12 rounded-xl overflow-visible">

    {/* Arrow-shaped bar */}
    <div
      className="h-full smooth-bar arrow-bar relative"
      style={{ width: `${percentage}%` }}
    >
      {/* Percentage (big + centered) */}
      <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-xl percentage-text">
        {percentage}%
      </span>
    </div>

    {/* Glowing dot at tip */}
    <div
      className="soft-glow"
      style={{ left: `${percentage}%` }}
    ></div>

    {/* Particles */}
    <div className="particles-wrapper pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="particle"></span>
      ))}
    </div>
  </div>
</div>
{/* 45 Days Progress (Smaller Bar) */}
<div className="mb-10">
  <p className="text-lg mb-3 font-semibold text-gray-700">45-Day Timeline</p>

  <div className="relative w-full bg-gray-300 h-8 rounded-xl overflow-visible">

    {/* Arrow-style animated bar */}
    <div
      className="h-full smooth-bar arrow-bar relative"
      style={{ width: `${dayProgress}%` }}
    >
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base percentage-text">
        {dayProgress}%
      </span>
    </div>

    {/* Glow effect */}
    <div
      className="soft-glow"
      style={{ left: `${dayProgress}%` }}
    ></div>
  </div>

  {/* Remaining days text */}
  <p className="text-sm text-gray-600 mt-2">
    {daysLeft} days remaining out of 45 days
  </p>
</div>



      {/* Stats + Pie Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
  {/* Completed Tasks */}
  <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all">
    <h3 className="font-semibold text-gray-700">Tasks Completed</h3>
    <p className="text-4xl font-extrabold text-green-600">{completed}</p>
  </div>

  {/* Pending Tasks */}
  <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all">
    <h3 className="font-semibold text-gray-700">Pending Tasks</h3>
    <p className="text-4xl font-extrabold text-orange-500">{pending}</p>
  </div>

  {/* Overdue Days */}
  <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-all">
    <h3 className="font-semibold text-red-700">Overdue Days</h3>
    <p className="text-4xl font-extrabold text-red-600">
      {overdueDays} <span className="text-lg font-medium">days</span>
    </p>
  </div>

  {/* Remaining Days */}
  <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all">
    <h3 className="font-semibold text-blue-700">Remaining Days</h3>
    <p className="text-4xl font-extrabold text-blue-600">
      {daysLeft} <span className="text-lg font-medium">days</span>
    </p>
  </div>
</div>


       <div className="w-full flex flex-col items-center bg-gray-50 p-6 rounded-xl border shadow-sm animate-fade-in">

  <h3 className="text-lg font-semibold text-gray-800 mb-4">
    Project Overview (Deliverables Status)
  </h3>

 <div className="chart-wrapper">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart className="pie-hover">
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={105}
        paddingAngle={2}
        startAngle={90}
        endAngle={-270}
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>

      {/* Center Text */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-bold fill-gray-800"
      >
        {targetPercentage}%
      </text>

      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs fill-gray-500"
      >
        Completed
      </text>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

</div>

      </div>
      
      {/* Animations */}
      <style>
        {`
        /* Smooth interactive pie */
.pie-hover {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

/* Desktop Hover */
.pie-hover:hover {
  transform: scale(1.04);
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.12));
}

/* Mobile touch feedback */
.pie-hover:active {
  transform: scale(0.97);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

/* Background container */
.chart-wrapper {
  width: 100%;
  height: 260px;
  border-radius: 20px;
  background: linear-gradient(145deg, #f9fafb, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.05);
}

        .chart-wrapper {
  width: 100%;
  height: 260px;
  border-radius: 20px;
  background: linear-gradient(145deg, #f9fafb, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
}

/* Soft glass glow around pie */
.recharts-wrapper {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

        /* Fade In */
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Animated Gradient Bar with Shake */
        .animated-bar {
          background: linear-gradient(90deg,
            #4f46e5,
            #9333ea,
            #ec4899,
            #f59e0b,
            #4f46e5
          );
          background-size: 400% 400%;
          animation:
            gradientShift 6s ease infinite,
            subtleShake 3s infinite ease-in-out,
            growWidth 0.6s ease-out forwards;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes subtleShake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-1px); }
          50% { transform: translateX(1px); }
          75% { transform: translateX(-0.5px); }
          100% { transform: translateX(0); }
        }
          /* Smooth animated gradient */
.smooth-bar {
  background: linear-gradient(90deg,
    #4f46e5,
    #7c3aed,
    #d946ef,
    #f97316,
    #4f46e5
  );
  background-size: 300% 300%;
  animation:
    smoothGradient 8s ease-in-out infinite,
    smoothGrow 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes smoothGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes smoothGrow {
  from { width: 0%; }
}

/* ARROW SHAPE using clip-path */
.arrow-bar {
  clip-path: polygon(
    0 0,          /* left top */
    calc(100% - 20px) 0,   /* before arrow tip */
    100% 50%,     /* arrow tip */
    calc(100% - 20px) 100%,/* before arrow tip bottom */
    0 100%,       /* left bottom */
    0 0           /* close shape */
  );
}

/* Fade-in percentage text */
.percentage-text {
  animation: textFade 0.8s ease-out forwards;
}
@keyframes textFade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Soft glowing dot at arrow tip */
.soft-glow {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.9),
    rgba(255,255,255,0.05)
  );
  border-radius: 50%;
  filter: blur(10px);
  animation: glowPulse 2.6s ease-in-out infinite;
}

@keyframes glowPulse {
  0%   { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); }
  50%  { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
  100% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); }
}

/* Gentle particles */
.particles-wrapper {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  opacity: 0.25;
  animation: particleFlow 3s linear infinite;
}

@keyframes particleFlow {
  0%   { transform: translateX(-10%) translateY(-4px); opacity: 0; }
  50%  { opacity: 0.4; }
  100% { transform: translateX(120%) translateY(4px); opacity: 0; }
}


        @keyframes growWidth {
          from { width: 0%; }
        }

        /* Pulse Glow */
        .glow-pulse {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 22px;
          height: 22px;
          background: radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0.1));
          border-radius: 50%;
          filter: blur(5px);
          animation: pulse 1.6s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.7; }
        }

        /* Particles */
        .particles-wrapper {
          position: absolute;
          inset: 0;
        }
        .particle {
          position: absolute;
          top: 50%;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: particleMove 1.6s infinite linear;
        }
        @keyframes particleMove {
          0% { transform: translateX(-10%) translateY(-3px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(110%) translateY(3px); opacity: 0; }
        }

        /* Shine */
        .shine-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.7), transparent);
          animation: shine 2.3s infinite ease-in-out;
        }
        @keyframes shine {
          from { left: -100%; }
          to { left: 120%; }
        }

        /* Counter */
        .animated-counter {
          animation: popIn 0.4s ease-out forwards;
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(6px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
          /* Percentage text animation */
.percentage-text {
  animation: percentFade 0.5s ease-out forwards;
}

@keyframes percentFade {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
  /* Smooth lux gradient bar */
.smooth-bar {
  background: linear-gradient(90deg,
    #2600ffff,
    #0acdc3ff,
    #10c0c0ff,
    #ff00f2ff,
    #4f46e5
  );
  background-size: 300% 300%;
  animation:
    smoothGradient 8s ease-in-out infinite,
    smoothGrow 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

/* Ultra-smooth gradient shift */
@keyframes smoothGradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Smooth width change */
@keyframes smoothGrow {
  from { width: 0%; }
}

/* Big readable percentage text */
.percentage-text {
  animation: textFade 0.8s ease-out forwards;
}

@keyframes textFade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Soft glowing tip (no harsh pulsing) */
.soft-glow {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  background: radial-gradient(circle,
    rgba(255,255,255,0.9),
    rgba(255,255,255,0.05)
  );
  border-radius: 50%;
  filter: blur(8px);
  animation: glowPulse 2.6s ease-in-out infinite;
}

@keyframes glowPulse {
  0%   { opacity: 0.5; transform: translate(-50%, -50%) scale(0.85); }
  50%  { opacity: 1;   transform: translate(-50%, -50%) scale(1.1); }
  100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.85); }
}

/* Very subtle particles */
.particles-wrapper {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  opacity: 0.3;
  animation: particleFlow 2.8s linear infinite;
}

@keyframes particleFlow {
  0%   { transform: translateX(-10%) translateY(-2px); opacity: 0; }
  50%  { opacity: 0.4; }
  100% { transform: translateX(120%) translateY(2px); opacity: 0; }
}


        `}
      </style>
    </div>
  );
};

export default ProjectProgress;
