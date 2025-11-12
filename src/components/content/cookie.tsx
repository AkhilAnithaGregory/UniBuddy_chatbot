import { Link } from "@tanstack/react-router";
import { BiSolidCookie } from "react-icons/bi";

export const CookiePopUp = () => {
  return (
    <div className="fixed left-2 bottom-2 bg-white p-2 rounded-md w-1/3 shadow-2xl">
      <div className="flex items-center gap-x-4 ">
        <BiSolidCookie className="min-w-20" size="80px" />
        <div className="text-[15px]">
          By using this site, you agree that UniBuddy can store certain types of
          Cookies on your device and disclose information in accordance with our{" "}
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <button
          type="button"
          className="bg-blue-400 text-white rounded-md p-2 w-full"
        >
          Accept all cookies
        </button>
        <button
          type="button"
          className="bg-blue-400 text-white rounded-md p-2 w-full"
        >
          Accept only necessary cookies
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white rounded-md p-2 w-full"
        >
          Decline all cookies
        </button>
      </div>
    </div>
  );
};
