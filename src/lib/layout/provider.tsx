import React from "react";
import { ThemeProvider } from "@/lib/context/theme-provider";
import { SidebarProvider } from "../context/sidebar-context";
import { CheckInProvider } from "../context/checkInContext";

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  return (
    <CheckInProvider>
      <SidebarProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </SidebarProvider>
    </CheckInProvider>
  );
}

export default Provider;
