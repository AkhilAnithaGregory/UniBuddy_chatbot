import { BsThreeDots } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useSidebar } from "@/lib/context/sidebar-context";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isSidebarOpen } = useSidebar();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 10 (November)

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  console.log(daysInMonth);
  //Need to add a event to close the menu
  /* useEffect(() => {
    if (!showMenu) return; 
    const handleClick = () => {
      alert("body clicked");
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showMenu]); */
  return (
    <div className="bg-gray-800">
      <div
        className={`${isSidebarOpen ? "pl-56" : "pl-12"} flex items-center justify-between px-4 py-2 text-white relative transition-all duration-300`}
      >
        <span>UniBuddy</span>
        <div>
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="group hover:bg-gray-200 transition-colors duration-300 cursor-pointer p-2 rounded-md"
          >
            <BsThreeDots className="group-hover:text-gray-800" />
          </button>
          <ul
            className={`${showMenu ? "block" : "hidden"} position absolute top-9 right-5 bg-gray-600 p-2 rounded-md text-base space-y-2`}
          >
            <li className="flex items-center gap-x-2 ">
              <IoChatbubbleEllipsesOutline />
              <span>Temporary Chat</span>
            </li>
            <li className="flex items-center gap-x-2 ">
              <BiSupport />
              <span>Support</span>
            </li>
            <li className="flex items-center gap-x-2 text-red-300">
              <RiDeleteBin5Line />
              <span>Delete Chat</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
