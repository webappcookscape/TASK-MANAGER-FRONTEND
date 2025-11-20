import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProjectProgress from "./components/ProjectProgress";
import TaskList from "./components/TaskList";
import ActivityFeed from "./components/ActivityFeed";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Feedback from "./components/Feedback";

import { dummyActivityFeed } from "./data/dummyActivityFeed";
import { clientTasks as initialTasks } from "./data/clientTasks";

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activity, setActivity] = useState([]);
  const [selected, setSelected] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- Task Status Toggle + Activity Logging ----
  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        // mark complete
        if (t.id === id && t.status === "pending") {
          const timestamp = new Date().toISOString();
          setActivity((oldLogs) => [
            {
              id: `${id}-${timestamp}`,
              taskId: id,
              message: `${t.name} marked as completed`,
              time: timestamp,
            },
            ...oldLogs,
          ]);
          return { ...t, status: "completed", completedAt: timestamp };
        }

        // revert to pending
        if (t.id === id && t.status === "completed") {
          setActivity((oldLogs) =>
            oldLogs.filter((log) => log.taskId !== id)
          );
          return { ...t, status: "pending", completedAt: null };
        }

        return t;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ---------- Mobile Top Navbar ---------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow py-3 px-4 flex justify-between items-center z-30">
        <h1 className="text-lg font-semibold">Client Panel</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>

      {/* ---------- Mobile Sidebar Slide-in ---------- */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 md:hidden
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          selected={selected}
          setSelected={(val) => {
            setSelected(val);
            setMenuOpen(false);
          }}
        />
      </div>

      {/* ---------- Desktop Sidebar ---------- */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 w-64 bg-white shadow">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>

      {/* ---------- Main Content ---------- */}
      <div className="pt-16 md:pt-0 md:ml-64 p-4 md:p-6">

        {/* ----- MOBILE VIEW (Page-by-page like desktop) ----- */}
        <div className="block md:hidden">
          {selected === "overview" && <ProjectProgress tasks={tasks} />}
          {selected === "tasks" && (
            <TaskList tasks={tasks} toggleStatus={toggleStatus} />
          )}
          {selected === "activity" && (
            <ActivityFeed activity={activity} dummyActivity={dummyActivityFeed} />
          )}
          {selected === "gallery" && <Gallery />}
          {selected === "timeline" && <Timeline tasks={tasks} compact />}
          {selected === "feedback" && <Feedback />} {/* NEW */}
        </div>

        {/* ----- DESKTOP VIEW ----- */}
        <div className="hidden md:block">
          {selected === "overview" && <ProjectProgress tasks={tasks} />}
          {selected === "tasks" && (
            <TaskList tasks={tasks} toggleStatus={toggleStatus} />
          )}
          {selected === "activity" && (
            <ActivityFeed activity={activity} dummyActivity={dummyActivityFeed} />
          )}
          {selected === "gallery" && <Gallery />}
          {selected === "timeline" && <Timeline tasks={tasks} />}
          {selected === "feedback" && <Feedback />} {/* NEW */}
        </div>
      </div>
    </div>
  );
};

export default App;
