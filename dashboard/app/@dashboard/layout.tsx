import Sidebar from "./@sidebar/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 flex-1 flex-col">{children}</div>
    </div>
  );
}
