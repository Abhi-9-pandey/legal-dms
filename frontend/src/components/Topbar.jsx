function Topbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Search */}
      <div className="w-96">

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5">

          <span className="text-slate-500">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search documents, cases..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-slate-500 w-full"
          />

          <span className="text-xs text-slate-600">
            Ctrl K
          </span>

        </div>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="text-slate-400 hover:text-white transition">
          ♧
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-semibold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden sm:block">

            <p className="text-sm text-white">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;
