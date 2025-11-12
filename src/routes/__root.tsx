import { createRootRoute, Outlet } from "@tanstack/react-router";
import Provider from "@/lib/layout/provider";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Sidebar } from "@/components/common/sidebar";
import { CookiePopUp } from "@/components/content/cookie";

import "./__root.css";

const RootLayout = () => {
  return(
  <Provider>
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <Sidebar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer/>
    </div>
    <CookiePopUp/>
  </Provider>
)
};

export const Route = createRootRoute({ component: RootLayout });
