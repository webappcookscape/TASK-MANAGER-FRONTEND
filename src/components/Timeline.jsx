import React from "react";

const Timeline = ({ tasks, compact }) => {
  const isMobile = window.innerWidth < 768;
  const useCompact = compact || isMobile;

  const formatDateTime = (d) =>
    new Date(d).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // ---------------- MOBILE VIEW ----------------
  if (useCompact) {
    return (
      <div className="w-full">
        <h2 className="text-base font-semibold mb-2">Project Timeline</h2>

        <div className="space-y-3">
          {tasks.map((task, i) => {
            const start = new Date();
            start.setDate(start.getDate() + i);
            start.setHours(10, 0);

            const end = new Date(start);
            end.setHours(start.getHours() + 3);

            return (
              <div
                key={task.id}
                className="bg-gray-50 border rounded-lg p-3"
              >
                <p className="text-sm font-semibold">{task.name}</p>

                <div className="text-[10px] text-gray-600 mt-1 flex justify-between">
                  <span>Start:</span>
                  <span>{formatDateTime(start)}</span>
                </div>

                {task.status === "completed" && (
                  <div className="text-[10px] text-gray-600 flex justify-between">
                    <span>End:</span>
                    <span>{formatDateTime(end)}</span>
                  </div>
                )}

                {task.status === "completed" && (
                  <div className="w-full bg-gray-300 h-2 rounded mt-2">
                    <div className="h-2 bg-green-600 rounded w-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- DESKTOP VIEW ----------------
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>

      <div className="space-y-6">
        {tasks.map((task, i) => {
          const start = new Date();
          start.setDate(start.getDate() + i);
          start.setHours(10, 0);

          const end = new Date(start);
          end.setHours(start.getHours() + 3);

          return (
            <div key={task.id} className="border-l-2 border-indigo-500 pl-4 relative">
              <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-0"></div>

              <p className="font-semibold">{task.name}</p>

              <p className="text-xs text-gray-500">
                Start: {formatDateTime(start)}
              </p>

              {task.status === "completed" && (
                <p className="text-xs text-gray-500">
                  End: {formatDateTime(end)}
                </p>
              )}

              {task.status === "completed" && (
                <div className="w-full h-2 bg-gray-200 rounded mt-2">
                  <div className="h-2 bg-green-600 rounded w-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
