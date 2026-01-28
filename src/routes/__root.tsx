import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import Provider from "@/lib/layout/provider";
import { Header } from "@/components/common/header";
import { Sidebar } from "@/components/common/sidebar";
import { Toaster } from 'react-hot-toast';
import "./__root.css";
import { useEffect } from "react";
import { MarkDailyCheckin } from "@/lib/api";

const RootLayout = () => {
  const location = useLocation();
  useEffect(() => {
    MarkDailyCheckin();
  }, []);
  return (
    <Provider>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <Sidebar />
        <div
          className={`${location.pathname === "/" ? "grow" : ""} flex items-end w-full`}
        >
          <Outlet />
        </div>
       <Toaster  /> 
      </div>
    </Provider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
