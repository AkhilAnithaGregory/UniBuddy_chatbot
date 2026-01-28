import { FiSidebar } from "react-icons/fi";
import { useSidebar } from "@/lib/context/sidebar-context";
import { Link, useNavigate } from "@tanstack/react-router";
import { MdDashboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { TbMoodHappyFilled } from "react-icons/tb";
import { IoIosJournal } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "@/lib/store/authToken";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { token, setToken } = useAuthStore(); 

  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.removeItem("cid")
    sessionStorage.removeItem("uid")
    navigate({ to: "/" });
  };
  return (
    <div
      className={`${isSidebarOpen ? "w-52" : "w-10"} bg-[url('/images/bg.jpg')] bg-center bg-repeat bg-auto transition-all duration-300 flex flex-col bg-gray-600 fixed top-0 left-0 bottom-0 z-50`}
      style={{
        backgroundSize: "200px 200px",
      }}
    >
      <div className="flex justify-between p-2 text-white h-10 items-start">
        <Link className={isSidebarOpen ? "block" : "hidden"} to="/">
          <img className="w-6" src="/images/logo.png" alt="Logo" />
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
                Chat
              </span>
            </Link>
          </li>
          {!token && (
            <li>
              <Link className="flex items-center pl-6" to="/auth/login">
                <span
                  className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
                >
                  Login
                </span>
              </Link>
            </li>
          )}
          {!token && (
            <li>
              <Link className="flex items-center pl-6" to="/auth/sign_up">
                <span
                  className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
                >
                  Sign Up
                </span>
              </Link>
            </li>
          )}
          {token && (
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
          )}
          {token && (
            <li>
              <Link
                className="flex items-center gap-x-2"
                to="/user/mood-tracker"
              >
                <TbMoodHappyFilled />
                <span
                  className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
                >
                  Mood Tracker
                </span>
              </Link>
            </li>
          )}
          {token && (
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
          )}
          {token && (
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
          )}
          {token && (
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
          )}
          {token && (
            <li>
              <button
                className="flex items-center gap-x-2"
                type="button"
                onClick={handleLogout}
              >
                <FiLogOut />
                <span
                  className={`cursor-pointer transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`}
                >
                  Logout
                </span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
