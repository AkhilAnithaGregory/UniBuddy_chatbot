import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/common/header";
import { Sidebar } from "../components/common/sidebar";
import "./__root.css";

const RootLayout = () => (
  <div className="relative min-h-screen">
    <Header />
    <Sidebar/>
    <Outlet />
   {/* <TanStackRouterDevtools /> */}
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
