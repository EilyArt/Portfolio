import React, { ReactNode } from "react";
import SideBar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>
        <div className="flex-1 h-full ml-1/4">
          <Topbar />
          <SideBar />
          <div className="p-4 sm:ml-64 mt-14 flex justify-center">
            {children}
          </div>
        </div>
        <Toaster />
      </main>
    </ThemeProvider>
  );
};

export default LayoutWrapper;
