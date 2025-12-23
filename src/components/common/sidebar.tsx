import { FiSidebar } from "react-icons/fi";
import { useSidebar } from "@/lib/context/sidebar-context";
import { Link } from "@tanstack/react-router";
import { MdDashboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { TbMoodHappyFilled } from "react-icons/tb";
import { IoIosJournal } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div
      className={`${isSidebarOpen ? "w-52" : "w-10"} transition-all duration-300 flex flex-col bg-gray-600 absolute top-0 left-0 bottom-0 z-50`}
    >
      <div className="flex justify-between p-2 text-white">
        <Link className={isSidebarOpen ? "block" : "hidden"} to="/">
          <FaRobot size="20px" />
        </Link>
        <button type="button" onClick={toggleSidebar}>
          <FiSidebar />
        </button>
      </div>
      <div className="grow p-2 text-white">
        <ul className="space-y-3">
          <li>
            <Link className="flex items-center gap-x-2 transition-all" to="/">
              <IoIosChatbubbles size="20px" />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Chat Assitant
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-x-2" to="/user/dashboard">
              <MdDashboard />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-x-2" to="/user/mood-tracker">
              <TbMoodHappyFilled />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Mood Tracker
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-x-2" to="/user/journal">
              <IoIosJournal />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Journal
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-x-2" to="/user/resource">
              <MdDashboard />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Resources
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-x-2" to="/user/profile">
              <FaUser />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Profile
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-x-2" to="/settings">
              <IoSettings />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto text-white">LOGOUT</div>
    </div>
  );
};
