import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    
    navigate("/login"); 
  };

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
        <button className="text-slate-400 hover:text-white transition" title="Notifications">
          ♧
        </button>

        {/* User Menu*/}
        <div className="relative">
          
          <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-3 hover:bg-slate-900 rounded-lg px-2 py-2 transition" >

            {/* Avatar */} 
            <div className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-semibold"> 
              {user?.name?.charAt(0)?.toUpperCase()} 
            </div>

            {/* User information */} 
            <div className="hidden sm:block text-left"> 
              <p className="text-sm text-white"> 
                {user?.name} 
              </p> 
              
              <p className="text-xs text-slate-500"> 
                {user?.role} 
              </p> 
              
            </div>

            {/* Arrow */} 
            <span className="text-slate-500 text-xs"> 
              ▼ 
            </span>

          </button>

          {/* Dropdown */} 
          {showMenu && ( 
            <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50"> 
              <div className="px-4 py-3 border-b border-slate-800"> 
                <p className="text-sm text-white font-medium"> 
                  {user?.name} 
                </p> 
                
                <p className="text-xs text-slate-500 mt-1"> 
                  {user?.email} 
                </p> 
                
              </div> 
              
              <button 
                onClick={() => navigate("/settings")} 
                className="w-full text-left px-4 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition" 
              > 
                ⚙ Settings 
              </button> 
              
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-950/40 transition" 
              > 
                ↪ Logout 
              </button> 
              
            </div> 
          
          )}
        </div>

      </div>

    </header>
  );
}

export default Topbar;
