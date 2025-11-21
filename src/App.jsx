import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProjectProgress from "./components/ProjectProgress";
import TaskList from "./components/TaskList";
import ActivityFeed from "./components/ActivityFeed";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import RaiseTicket from "./components/RaiseTicket";
import TopNavbar from "./components/TopNavbar";


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

    {/* TOP NAVBAR */}
    <TopNavbar
      setSelected={setSelected}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
    />

    {/* Wrapper */}
    <div className="flex pt-20">

      {/* ✅ Sidebar Desktop */}
      <div className="hidden md:block w-64 border-r bg-white min-h-screen">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>

      {/* ✅ Mobile Sidebar */}
     {menuOpen && (
  <div
    onClick={() => setMenuOpen(false)}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
  ></div>
)}


     {/* ✅ Mobile Sidebar */}
<div
  className={`fixed top-20 bottom-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 md:hidden
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}

  // Swipe detection
  onTouchStart={(e) => {
    window._touchStartX = e.touches[0].clientX;
  }}

  onTouchMove={(e) => {
    const touchEndX = e.touches[0].clientX;
    const diff = window._touchStartX - touchEndX;

    // Swipe left more than 70px = close sidebar
    if (diff > 70) {
      setMenuOpen(false);
    }
  }}
>
  <Sidebar
    selected={selected}
    setSelected={(val) => {
      setSelected(val);
      setMenuOpen(false);
    }}
  />
</div>


      {/* ✅ Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto min-h-screen">
        {selected === "overview" && <ProjectProgress tasks={tasks} />}
        {selected === "tasks" && <TaskList tasks={tasks} toggleStatus={toggleStatus} />}
        {selected === "activity" && <ActivityFeed activity={activity} dummyActivity={dummyActivityFeed} />}
        {selected === "gallery" && <Gallery />}
        {selected === "timeline" && <Timeline tasks={tasks} />}
        {selected === "feedback" && <RaiseTicket />}
      </div>

    </div>
  </div>
);

};

export default App;
