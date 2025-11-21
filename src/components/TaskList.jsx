import React from "react";
import { Download } from "lucide-react";

const TaskList = ({ tasks }) => {
  const downloadKeywords = ["receipt", "pdi", "2d", "3d", "guarantee"];

  const getStatusIcon = (status) => {
    if (status === "completed") {
      return (
        <span className="status-check">
          ✓
        </span>
      );
    }
    return (
      <span className="status-warn">
        !
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">Project Stages</h2>

      <div className="space-y-3">
        {tasks.map((task) => {
          const taskNameLower = task.name.toLowerCase();
          const isDownloadTask = downloadKeywords.some((word) =>
            taskNameLower.includes(word)
          );

          return (
            <div
              key={task.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border rounded-lg gap-2"
            >
              {/* Task Name + Status */}
              <div className="flex items-center gap-3">
                {getStatusIcon(task.status)}

                <div className="flex flex-col">
                  <p className="font-medium">{task.name}</p>

                  <span
                    className={`text-xs font-semibold mt-1 px-2 py-1 rounded w-fit ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>

              {/* DOWNLOAD BUTTON */}
              {isDownloadTask && task.fileUrl && (
                <a
                  href={task.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-indigo-700 transition"
                >
                  <Download size={14} />
                  Download
                </a>
              )}

              {/* TEST DOWNLOAD BUTTON WHEN FILE MISSING */}
              {isDownloadTask && !task.fileUrl && (
                <a
                  href="https://drive.google.com/file/d/14XP2DMwnPwreayRRHa5R2dyZoJ0UT8eJ/view?usp=drive_link"
                  download
                  target="_blank"
                  className="flex items-center gap-1 bg-gray-300 text-gray-700 text-xs font-medium px-3 py-1.5 rounded hover:bg-gray-400 transition"
                >
                  <Download size={14} />
                  Download
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Animations */}
      <style>
        {`
        /* Animated green tick */
        .status-check {
          font-size: 24px;
          font-weight: 900;
          color: #16a34a;
          animation: checkPop 0.4s ease-out, checkGlow 2s infinite ease-in-out;
          display: inline-block;
        }

        @keyframes checkPop {
          0%   { transform: scale(0.2); opacity: 0; }
          60%  { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); }
        }

        @keyframes checkGlow {
          0%   { text-shadow: 0 0 4px rgba(34,197,94,0.4); }
          50%  { text-shadow: 0 0 10px rgba(34,197,94,0.7); }
          100% { text-shadow: 0 0 4px rgba(34,197,94,0.4); }
        }

        /* Animated orange ! mark */
        .status-warn {
          font-size: 24px;
          font-weight: 900;
          color: #ea580c;
          animation: warnShake 0.5s ease-in-out, warnGlow 2s infinite ease-in-out;
          display: inline-block;
        }

        @keyframes warnShake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
          75% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes warnGlow {
          0%   { text-shadow: 0 0 4px rgba(234,88,12,0.4); }
          50%  { text-shadow: 0 0 10px rgba(234,88,12,0.8); }
          100% { text-shadow: 0 0 4px rgba(234,88,12,0.4); }
        }
        `}
      </style>
    </div>
  );
};

export default TaskList;
