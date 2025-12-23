import { useSidebar } from "../context/sidebar-context";

type UserLayoutType = {
  children: React.ReactNode;
};

export const UserLayout = ({ children }: UserLayoutType) => {
  const { isSidebarOpen } = useSidebar();
  return <div className={`${isSidebarOpen ? "pl-56" : "pl-12"} transition-all duration-300 py-4 pr-4`} >{children}</div>;
};
