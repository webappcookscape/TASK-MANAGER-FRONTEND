import React from "react";

const Sidebar = ({ selected, setSelected }) => {
  const menu = [
    { id: "overview", label: "Project Overview" },
    { id: "tasks", label: "Tasks" },
    { id: "activity", label: "Activity Feed" },
    { id: "gallery", label: "Gallery" },
    { id: "timeline", label: "Project Timeline" },
    { id: "feedback", label: "Feedback" }
  ];

  return (
    <div className="h-full overflow-y-auto p-5 min-w-[180px]">

      {/* Mobile-visible heading */}
      <div className="md:hidden mb-6">
        <h1 className="text-base font-bold leading-tight">
          COOKSCAPE WORK MANAGEMENT
        </h1>
        <span className="text-sm text-gray-600">Client Panel</span>
      </div>

      {/* Desktop heading */}
      <div className="hidden md:block mb-6">
        <h1 className="text-lg md:text-xl font-bold break-words">
          COOKSCAPE WORK MANAGEMENT
        </h1>
        <span className="text-sm md:text-base block pt-2">
          Client Panel
        </span>
      </div>

      {/* Menu */}
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
