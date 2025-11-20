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

  const COLORS = ["#22c55e", "#f97316"]; // green, orange

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
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



      {/* Stats + Pie Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-700">Tasks Completed</h3>
            <p className="text-4xl font-extrabold text-green-600">{completed}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-700">Pending Tasks</h3>
            <p className="text-4xl font-extrabold text-orange-500">{pending}</p>
          </div>
        </div>

        <div className="w-full opacity-0 animate-fade-in" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                paddingAngle={5}
                animationDuration={1200}
                label={({ name }) => name}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
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
    #00d412ff,
    #339b0aff,
    #c0f500ff,
    #15ff00ff,
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
