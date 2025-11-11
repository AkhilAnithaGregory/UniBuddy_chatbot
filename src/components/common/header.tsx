import { BsThreeDots } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-gray-800">
      <div className="flex items-center justify-between px-4 py-2 text-white relative">
        <span>ChatBot</span>
        <div>
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="group hover:bg-gray-200 transition-colors duration-300 cursor-pointer p-2 rounded-md"
          >
            <BsThreeDots className="group-hover:text-gray-800" />
          </button>
          <ul className={`${showMenu ? "block" : "hidden"} position absolute top-9 right-5 bg-gray-600 p-2 rounded-md text-base space-y-2`}>
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
