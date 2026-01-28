import { PageTitle } from "@/components/content/pageTitle";
import { UserLayout } from "@/lib/layout/userLayout";
import { useAuthStore } from "@/lib/store/authToken";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();
  return (
    <UserLayout>
      <PageTitle title="User Profile" />
      <div className="shadow-[0px_0px_10px_10px] shadow-gray-100 w-full rounded-md p-4 my-3 relative">
        <div className="flex items-center mt-4">
          <img
            src={user.gender ==="Female"? "/images/female.png" :"/images/male.png"}
            alt="User Profile"
            className="w-30 h-30 rounded-full"
          />
          <div className="px-5 w-full space-y-2">
            <div className="flex items-center gap-x-5 px-1">
              <h2 className="text-md font-semibold w-40">Name</h2>
              <div className="flex items-center justify-between">
                <input
                  readOnly
                  className="text-lg font-small focus:outline-none w-full px-1"
                 value={user.name}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-5 px-1">
              <h2 className="text-md font-semibold w-40">Gender</h2>
              <div className="flex items-center justify-between">
                <input
                  readOnly
                  className="text-lg font-small focus:outline-none w-full px-1"
                 value={user.gender}
              placeholder="Enter gender"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-5 px-1">
              <h2 className="text-md font-semibold w-40">Profession</h2>
              <div className="flex items-center justify-between">
                <input
                  readOnly
                  className="text-lg font-small focus:outline-none w-full px-1"
                  value="Student"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-5 px-1">
              <h2 className="text-md font-semibold w-40">Email</h2>
              <div className="flex items-center justify-between">
                <input
                  readOnly
                  className="text-lg font-small focus:outline-none w-full px-1"
                  maxLength={30}
                  value={user.email}
                  placeholder="Enter Email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
