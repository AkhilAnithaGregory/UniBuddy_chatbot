import { FiSidebar } from "react-icons/fi";
import { useSidebar } from "@/lib/context/sidebar-context";
import { Link } from "@tanstack/react-router";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div
      className={`${isSidebarOpen ? "min-w-52" : "min-w-20"} transition-all duration-300 flex flex-col bg-gray-600 absolute top-0 left-0 bottom-0`}
    >
      <div className="flex justify-between p-2 text-white">
        <Link to="/">ICON</Link>
        <button type="button" onClick={toggleSidebar}>
          <FiSidebar />
        </button>
      </div>
      <div className="grow p-2 text-white">
        <ul className="space-y-3">
          <li>New Chat</li>
          <li>User Profile</li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto text-white">LOGOUT</div>
    </div>
  );
};
