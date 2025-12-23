import { PageTitle } from "@/components/content/pageTitle";
import { UserLayout } from "@/lib/layout/userLayout";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export const Route = createFileRoute("/user/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [userSection, setUserSection] = useState(false);
  const [userDetailSection, setUserDetailSection] = useState(false);
  return (
    <UserLayout>
      <PageTitle title="User Profile" />
      <div className="shadow-[0px_0px_10px_10px] shadow-gray-100 w-full rounded-md p-4 my-3 relative">
        <div className="flex items-center mt-4">
          <img
            src="/images/male.png"
            alt="User Profile"
            className="w-30 h-30 rounded-full"
          />
          <div className="px-5 w-full space-y-2">
            <input
              readOnly={!userSection}
              className={`${userSection ? "border-b-2" : "mb-2"} text-lg font-semibold focus:outline-none w-full px-1`}
              maxLength={30}
              defaultValue="Kevin Peter"
              placeholder="Enter name"
            />
            <input
              readOnly={!userSection}
              className={`${userSection ? "border-b-2" : ""} text-lg font-small focus:outline-none w-full px-1`}
              maxLength={10}
              defaultValue="Male"
              placeholder="Enter gender"
            />
            <input
              readOnly={!userSection}
              className={`${userSection ? "border-b-2" : ""} text-lg font-small focus:outline-none w-full px-1`}
              maxLength={10}
              defaultValue="Student"
              placeholder="Profession"
            />
          </div>
        </div>
        <FaRegEdit
          onClick={() => setUserSection(!userSection)}
          className="absolute top-4 right-4"
        />
      </div>
      <div className="shadow-[0px_0px_10px_10px] shadow-gray-100 w-full rounded-md p-4 my-3 relative">
        <ul>
          <li>
            <h2 className="text-md font-semibold">Email</h2>
            <div className="flex items-center justify-between">
              <input
                readOnly={!userDetailSection}
                className={`${userDetailSection ? "border-b-2" : ""} text-lg font-small focus:outline-none w-full px-1`}
                maxLength={30}
                defaultValue="user@example.com"
                placeholder="Enter Email"
              />
            </div>
          </li>
          <li>
            <h2 className="text-md font-semibold">Phone Number</h2>
            <input
              readOnly={!userDetailSection}
              className={`${userDetailSection ? "border-b-2" : ""} text-lg font-small focus:outline-none w-full px-1`}
              maxLength={10}
              defaultValue="9089718628"
              placeholder="Enter Phone Number"
            />
          </li>
        </ul>
        <FaRegEdit
          onClick={() => setUserDetailSection(!userDetailSection)}
          className="absolute top-4 right-4"
        />
      </div>
    </UserLayout>
  );
}
