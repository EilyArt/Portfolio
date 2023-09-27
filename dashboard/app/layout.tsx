import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

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
          </ThemeProvider>
        </body>
      </html>
    </>
  )
};

export default Layout;
