function Dashboard() {
  return (
    <div>

      <div className="mb-8">

        <p className="text-sm text-cyan-400 mb-2">
          Overview
        </p>

        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor your organization's secure document environment.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Total Documents
          </p>

          <h2 className="text-3xl font-semibold mt-3">
            0
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Securely stored
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Active Cases
          </p>

          <h2 className="text-3xl font-semibold mt-3">
            0
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Currently active
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Evidence Records
          </p>

          <h2 className="text-3xl font-semibold mt-3">
            0
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Tracked evidence
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Security Events
          </p>

          <h2 className="text-3xl font-semibold mt-3">
            0
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Recent activity
          </p>
        </div>

      </div>

      {/* Activity */}
      <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-lg font-semibold">
              Recent Activity
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Security and document activity will appear here.
            </p>
          </div>

          <span className="text-xs text-emerald-400 border border-emerald-900 bg-emerald-950 px-3 py-1 rounded-full">
            System Online
          </span>

        </div>

        <div className="h-40 flex items-center justify-center border border-dashed border-slate-800 rounded-lg">

          <p className="text-sm text-slate-600">
            No recent activity
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
