import { NavLink } from "react-router-dom";

function Sidebar() {
  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂"
    },
    {
      name: "Documents",
      path: "/documents",
      icon: "▤"
    },
    {
      name: "Cases",
      path: "/cases",
      icon: "▣"
    },
    {
      name: "Evidence",
      path: "/evidence",
      icon: "◈"
    },
    {
      name: "Audit Logs",
      path: "/audit-logs",
      icon: "◷"
    },
    {
      name: "Users",
      path: "/users",
      icon: "♙"
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Logo */}
      <div className="h-20 px-6 flex items-center border-b border-slate-800">

        <div>
          <h1 className="text-xl font-bold">
            Legal<span className="text-cyan-400">DMS</span>
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Secure Document System
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">

        <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
          Workspace
        </p>

        <div className="space-y-1">

          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-slate-800 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >

              <span className="w-5 text-center">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </NavLink>
          ))}

        </div>

        <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mt-8 mb-3">
          System
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg transition ${
              isActive
                ? "bg-slate-800 text-cyan-400"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`
          }
        >
          <span className="w-5 text-center">
            ⚙
          </span>

          <span>
            Settings
          </span>
        </NavLink>

      </nav>

      {/* Security Status */}
      <div className="p-4">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>

            <span className="text-sm text-slate-300">
              System Secure
            </span>

          </div>

          <p className="text-xs text-slate-500 mt-2">
            Protected environment
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
