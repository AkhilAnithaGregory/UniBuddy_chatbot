import React from "react";
import { ThemeProvider } from "@/lib/context/theme-provider";
import { SidebarProvider } from "../context/sidebar-context";

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  return (
    <SidebarProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
}

export default Provider;
