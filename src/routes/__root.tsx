import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/common/header";
import { Sidebar } from "../components/common/sidebar";
import "./__root.css";

const RootLayout = () => (
  <div className="relative min-h-screen">
    <Header />
    <Sidebar />
    <Outlet />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
