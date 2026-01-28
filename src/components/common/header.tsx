import { Link, useLocation } from "@tanstack/react-router";
import { BsThreeDots } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useState } from "react";
import { useSidebar } from "@/lib/context/sidebar-context";
import { nanoid } from "nanoid";
import { useAuthStore } from "@/lib/store/authToken";

export const Header = () => {
  const location = useLocation();
   const { token } = useAuthStore(); 
  const [showMenu, setShowMenu] = useState(false);
  const { isSidebarOpen } = useSidebar();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); 

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  console.log(daysInMonth);
  
  const refreshPage = () => {
      const newConversationId = nanoid();
      const newUserId = nanoid();
      sessionStorage.removeItem("chat-session");
      sessionStorage.setItem("cid", newConversationId);
      sessionStorage.setItem("uid", newUserId);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };
  return (
    <div className="bg-gray-800">
      <div
        className={`${isSidebarOpen ? "pl-4 sm:pl-56" : "pl-4 sm:pl-12"} bg-[url('/images/bg.jpg')] bg-center bg-repeat bg-auto flex items-center font-extrabold justify-between px-4 py-4 text-white relative transition-all duration-300`}
        style={{
          backgroundSize: "200px 200px",
        }}
      >
        <span>UniBuddy</span>
        {location?.pathname === "/" &&
        <div>
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="group hover:bg-gray-200 transition-colors duration-300 cursor-pointer p-2 rounded-md"
          >
            <BsThreeDots className="group-hover:text-gray-800" />
          </button>
          <ul
            className={`${showMenu ? "block" : "hidden"} position absolute top-9 right-5 z-50 bg-gray-600 p-2 rounded-md font-normal text-sm space-y-2`}
          >
            <li onClick={refreshPage} className="items-center gap-x-2 cursor-pointer select-none">
              <IoChatbubbleEllipsesOutline />
              <span>New Chat</span>
            </li>
          </ul>
        </div>
        }
      </div>
    </div>
  );
};
