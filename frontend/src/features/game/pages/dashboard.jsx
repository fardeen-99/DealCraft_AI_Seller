import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGame } from "../hooks/game.hook";
import { useTheme } from "../../../context/ThemeContext";
import useAuth from "../../auth/hooks/auth.hook";

const Dashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.auth);
  const { handleGetProducts, handleStartGame } = useGame();
  const { handleLogout } = useAuth();

  useEffect(() => {
    handleGetProducts();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fafbff] dark:bg-black font-sans transition-colors duration-500 overflow-x-hidden">
      {/* --- Header --- */}
      <header className="relative z-20 border-b border-slate-100 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Link to="/" className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">D</Link>
             <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">Command Center</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Agent</p>
              <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tighter">{user.username}</p>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-white dark:bg-black dark:text-white flex items-center justify-center text-xs font-bold">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              </div>
            </div>
            
            {/* Minimal Logout Button */}
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/20 transition-all active:scale-95"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* --- Welcome --- */}
        <div className="mb-16">
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
              Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Mission.</span>
           </h2>
           <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Choose a target to begin negotiations. Each seller has a unique personality.</p>
        </div>

        {/* --- Product Grid --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-[2.5rem] bg-slate-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <div 
              onClick={() => handleStartGame(product._id)}
                key={product._id}
                className="group relative bg-white dark:bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] p-6 border border-slate-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden mb-6 bg-slate-50 dark:bg-black/50">
                  <img 
                    src={product.image || "/placeholder.jpg"} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 backdrop-blur-md shadow-sm">
                    {product.category || "Luxury"}
                  </div>
                </div>

                <div className="mb-8">
                   <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">{product.title}</h3>
                   <div className="flex items-end gap-3">
                      <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${product.basePrice?.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Asking Price</span>
                   </div>
                </div>

                <button 
                  
                  className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-sm uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg active:scale-95 transition-all"
                >
                  Negotiate
                </button>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* --- Ambient Background --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default Dashboard;