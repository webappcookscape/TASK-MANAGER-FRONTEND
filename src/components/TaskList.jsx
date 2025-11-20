import React from "react";
import { Download } from "lucide-react";

const TaskList = ({ tasks }) => {
  const downloadKeywords = [
    "receipt",
    "pdi",
    "2d",
    "3d",
    "guarantee",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">Client Tasks</h2>

      <div className="space-y-3">
        {tasks.map((task) => {
          const taskNameLower = task.name.toLowerCase();

          // detect tasks that should support downloading
          const isDownloadTask = downloadKeywords.some((word) =>
            taskNameLower.includes(word)
          );

          return (
            <div
              key={task.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border rounded-lg gap-2"
            >
              {/* Task Name + Status */}
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

              {/* FILE NOT UPLOADED */}
              {isDownloadTask && !task.fileUrl && (
                <span className="text-xs text-red-500">
                  File not uploaded yet
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
