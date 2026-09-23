import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        <Topbar />

        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;

