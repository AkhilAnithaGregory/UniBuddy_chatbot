import { useState } from "react";
import { FiSidebar } from "react-icons/fi";

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className={`${showSidebar ? "min-w-52" : "min-w-20"} flex flex-col bg-gray-600 absolute top-0 left-0 bottom-0`}>
      <div className="flex justify-between p-2 text-white">
        <span>ICON</span>
        <button type="button" onClick={() => setShowSidebar(!showSidebar)}>
          <FiSidebar />
        </button>
      </div>
      <div className="grow">
        <ul className="space-y-3">
          <li>Chat</li>
          <li>User Profile</li>
          <li>Settings</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="mt-auto">LOGOUT</div>
    </div>
  );
};
