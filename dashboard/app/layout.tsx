import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const Layout = ({
  dashboard,
  auth,
}: {
  dashboard: React.ReactNode;
  auth: React.ReactNode;
}) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {true ? dashboard : auth}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default Layout;
