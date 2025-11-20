import React from "react";

const Sidebar = ({ selected, setSelected }) => {
  const menu = [
    { id: "overview", label: "Project Overview" },
    { id: "tasks", label: "Tasks" },
    { id: "activity", label: "Activity Feed" },
    { id: "gallery", label: "Gallery" },
    { id: "timeline", label: "Project Timeline" },
    { id: "feedback", label: "Feedback" }   // <-- Added here
  ];

  return (
    <div className="h-full overflow-y-auto p-5">
      <h1 className="text-xl font-bold mb-6 hidden md:block">COOKSCAPE WORK MANAGEMENT <br /><span className=" pt-3">Client Panel</span></h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`w-full text-left p-3 rounded-lg transition text-sm md:text-base ${
              selected === item.id
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
