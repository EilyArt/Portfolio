import "./globals.css";
import type { Metadata } from "next";

import LayoutWrapper from "@/components/layout";

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <LayoutWrapper>{true ? dashboard : auth}</LayoutWrapper>
      </body>
    </html>
  );
};

export default Layout;
