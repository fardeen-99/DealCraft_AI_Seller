import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import { useGame } from "./features/game/hooks/game.hook";

const Home = () => {
  const howitworkref = useRef(null);
  const leaderboardref = useRef(null);
  const featuresref = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const { user } = useSelector((state) => state.auth);
  const { leaderboard } = useSelector((state) => state.game);

  const { handleGetleaderboard } = useGame();

  useEffect(() => {
    handleGetleaderboard();
  }, []);




  return (
    <div className="min-h-screen bg-[#fafbff] dark:bg-black font-sans selection:bg-indigo-200 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 overflow-x-clip relative transition-colors duration-500">

      {/* --- Ambient Background Glows --- */}
      {/* <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/30 dark:bg-slate-900/20 rounded-full blur-[120px] pointer-events-none" /> */}

      {/* --- Navbar --- */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tighter">DealCraft AI</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <button onClick={() => handleScroll(featuresref)} className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">Features</button>
          <button onClick={() => handleScroll(howitworkref)} className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">How it Works</button>
          <button onClick={() => handleScroll(leaderboardref)} className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">Leaderboard</button>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <Link to="/dashboard" className="text-xs font-bold uppercase tracking-widest px-7 py-3 rounded-full bg-indigo-600 text-white hover:scale-105 active:scale-95 transition-all text-center shadow-lg shadow-indigo-500/20">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="cursor-pointer text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block">Login</Link>
              <Link to="/register" className="text-xs font-bold uppercase tracking-widest px-7 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all text-center">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="relative z-10">

        {/* --- Hero Section --- */}
        <section className="max-w-7xl mx-auto px-6 pt-13 md:pb-20 pb-15 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> The New Era of Negotiating
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-10">
              Negotiate <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Smarter.
              </span>
            </h1>

            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Challenge our adaptive AI seller, crack its pricing strategy, and win the game by securing the lowest possible deal in real-time.
            </p>

            <div

           
              className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <button
              
                 onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-indigo-600 text-white font-bold shadow-2xl shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
                {user ? "Go to Dashboard" : "Start Playing Now"}
              </button>
              <button 
              onClick={()=>window.open("https://www.linkedin.com/posts/mohd-fardeen-b31307358_ai-machinelearning-reactjs-activity-7444373285255163905-ErQd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFkI2ZUBq4qXUikQw1Kyeat8B4yjgN397jE", "_blank")}
              
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 group">
                <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                Watch Trailer
              </button>
            </div>
          </div>

          <div className="flex-1 m-h-fit relative w-full">
            <div className="relative z-10 w-full aspect-square rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] md:h-120 h-100 overflow-hidden flex flex-col p-5 md:p-10">

              <div className="flex items-center h-70 justify-between border-b border-slate-200/50 dark:border-white/5 pb-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center shadow-inner text-2xl">
                    🤖
                  </div>
                  <div>
                    <div className="text-base font-black text-slate-800 dark:text-white">AI Seller v4.2</div>
                    <div className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Active
                    </div>
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 uppercase tracking-widest whitespace-nowrap">
                  Rolex Submariner
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="self-end bg-indigo-600 text-white p-5 rounded-2xl rounded-tr-sm shadow-xl max-w-[85%] text-sm font-medium leading-relaxed">
                  I've already come down $2,000. $8,500 is my absolute floor. Last offer.
                </div>
                <div className="self-start bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-200 p-5 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] text-sm font-medium leading-relaxed">
                  Look, I'm a serious buyer. $8,200 right now, cash deal. What do you say?
                </div>
                <div className="self-end bg-indigo-600 text-white p-5 rounded-2xl rounded-tr-sm shadow-xl max-w-[85%] text-sm font-medium leading-relaxed translate-y-2 opacity-0 animate-[fade-in-up_1s_ease_forwards] delay-500">
                  Deal! You drive a hard bargain. 🤝
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- Features --- */}
        <section ref={featuresref} className="max-w-7xl mx-auto px-6 py-22 ">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group bg-white dark:bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🧩</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Behavioral AI</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Sellers remember your previous offers and react to your tone, persistence, and logic.</p>
            </div>
            <div className="group bg-white dark:bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🌪️</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Dynamic Stakes</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">The artificial market moves in real-time. Wait too long, and someone else might buy it.</p>
            </div>
            <div className="group bg-white dark:bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏅</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Global Rankings</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Prove your negotiation skills and climb the tiers to become an Elite Negotiator.</p>
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section ref={howitworkref} className="bg-slate-950 dark:bg-black text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-black pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-24">Unlock the Deal.</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: "01", title: "Select", desc: "Choose a mission-critical product." },
                { step: "02", title: "Engage", desc: "Open the encrypted chat line." },
                { step: "03", title: "Master", desc: "Apply logical pressure to win." },
                { step: "04", title: "Victory", desc: "Save big and rank globally." }
              ].map((item, i) => (
                <div key={i} className="group text-left cursor-pointer">
                  <div className="text-7xl font-black text-white/5 mb-4 group-hover:text-indigo-500/20 transition-colors">{item.step}</div>
                  <h4 className="text-2xl font-black mb-3">{item.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Leaderboard --- */}
        <section ref={leaderboardref} className="max-w-7xl mx-auto px-6 md:py-20 md:mb-10">
          {/* Header */}
          <div className="text-center mb-22">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-200 dark:border-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span>🏆</span> Hall of Fame
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">The Top 1%.</h2>
            <p className="text-slate-400 font-medium mt-4 text-base">Elite negotiators who cracked the price floor.</p>
          </div>

          {leaderboard && leaderboard.length > 0 ? (
            <div className="flex flex-col lg:flex-row items-end justify-center gap-6">

              {/* ── RANK 2 ── */}
              {leaderboard[1] && (() => {
                const item = leaderboard[1];
                const saved = (item.productId?.basePrice || 0) - (item.finalPrice || 0);
                const margin = item.productId?.basePrice ? ((saved / item.productId.basePrice) * 100).toFixed(1) : 0;
                return (
                  <div className="w-full lg:w-[28%] order-2 lg:order-1 lg:translate-y-8">
                    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-100 dark:border-white/5 rounded-[2rem] p-8 flex flex-col relative shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                      {/* Subtle top stripe */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500 rounded-t-[2rem]" />

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-black shadow-inner">🥈</div>
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Rank</p>
                            <p className="text-slate-900 dark:text-white font-black text-sm">#02</p>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/10">
                          {item.rounds} Rounds
                        </div>
                      </div>
                      
                      {item.productId?.image && (
                         <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative ring-1 ring-black/5 dark:ring-white/10">
                           <img src={item.productId.image} alt={item.productId.title || "Product"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                           <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-bold truncate">{item.productId.title}</p>
                         </div>
                      )}

                      <h4 className="text-2xl font-black text-slate-900 dark:text-white text-center truncate mb-2 mt-2">{(item.user?.username || "Anonymous").toUpperCase()}</h4>
                      
                      {/* <div className="flex justify-between items-center text-xs mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-slate-500 dark:text-slate-400 font-medium">Final Price: <span className="font-bold text-slate-800 dark:text-slate-200">${item.finalPrice?.toLocaleString()}</span></div>
                        <div className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">-{margin}% Deal</div>
                      </div> */}

                    </div>
                  </div>
                );
              })()}

              {/* ── RANK 1 ── */}
              {leaderboard[0] && (() => {
                const item = leaderboard[0];
                const saved = (item.productId?.basePrice || 0) - (item.finalPrice || 0);
                const margin = item.productId?.basePrice ? ((saved / item.productId.basePrice) * 100).toFixed(1) : 0;
                return (
                  <div className="w-full lg:w-[38%] order-1 lg:order-2 z-10">
                    <div className="relative bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-500/[0.08] dark:to-transparent border border-indigo-400/30 dark:border-indigo-500/20 backdrop-blur-2xl rounded-[2.5rem] p-10 flex flex-col overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
                      {/* Golden stripe */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-t-[2.5rem]" />

                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center text-2xl shadow-lg shadow-yellow-500/20">
                            👑
                            <div className="absolute inset-0 bg-yellow-400 rounded-2xl animate-ping opacity-20"></div>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.25em]">Champion</p>
                            <p className="text-slate-900 dark:text-white font-black">Global #01</p>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                          {item.rounds} Rounds
                        </div>
                      </div>
                      
                      {item.productId?.image && (
                         <div className="w-full h-40 rounded-2xl overflow-hidden mb-6 relative ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                           <img src={item.productId.image} alt={item.productId.title || "Product"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                           <div className="absolute bottom-3 left-4 right-4">
                              <p className="text-white text-sm font-black truncate">{item.productId.title}</p>
                              <p className="text-white/80 text-[10px] uppercase tracking-wider mt-0.5">Base: ${item.productId.basePrice?.toLocaleString()}</p>
                           </div>
                         </div>
                      )}

                      <h4 className="text-3xl text-center font-black text-slate-900 dark:text-white tracking-tighter truncate mt-2">{(item.user?.username || "Champion").toUpperCase()}</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 text-center font-bold text-xs uppercase tracking-widest mb-4 mt-2">Elite Negotiator</p>

                      {/* <div className="flex justify-between items-center text-sm mt-2 pt-5 border-t border-indigo-500/10 dark:border-indigo-500/20">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Final Price</span>
                           <span className="text-slate-900 dark:text-white font-black text-lg">${item.finalPrice?.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">Saved</span>
                           <span className="text-emerald-500 font-black text-lg bg-emerald-50 dark:bg-emerald-500/10 px-3 flex items-center justify-center rounded-lg shadow-sm">-{margin}%</span>
                        </div>
                      </div> */}

                    </div>
                  </div>
                );
              })()}

              {/* ── RANK 3 ── */}
              {leaderboard[2] && (() => {
                const item = leaderboard[2];
                const saved = (item.productId?.basePrice || 0) - (item.finalPrice || 0);
                const margin = item.productId?.basePrice ? ((saved / item.productId.basePrice) * 100).toFixed(1) : 0;
                return (
                  <div className="w-full lg:w-[28%] order-3 lg:translate-y-8">
                    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-100 dark:border-white/5 rounded-[2rem] p-8 flex flex-col relative shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                      {/* Top stripe */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 to-amber-400 rounded-t-[2rem]" />

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-xl shadow-inner">🥉</div>
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Rank</p>
                            <p className="text-slate-900 dark:text-white font-black text-sm">#03</p>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/10">
                          {item.rounds} Rounds
                        </div>
                      </div>
                      
                      {item.productId?.image && (
                         <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative ring-1 ring-black/5 dark:ring-white/10">
                           <img src={item.productId.image} alt={item.productId.title || "Product"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                           <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-bold truncate">{item.productId.title}</p>
                         </div>
                      )}

                      <h4 className="text-2xl font-black text-slate-900 dark:text-white text-center truncate mb-2 mt-2">{(item.user?.username || "Anonymous").toUpperCase()}</h4>
                      
                      {/* <div className="flex justify-between items-center text-xs mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-slate-500 dark:text-slate-400 font-medium">Final Price: <span className="font-bold text-slate-800 dark:text-slate-200">${item.finalPrice?.toLocaleString()}</span></div>
                        <div className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">-{margin}% Deal</div>
                      </div> */}

                    </div>
                  </div>
                );
              })()}

            </div>
          ) : (
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl mx-auto mb-6">🏆</div>
              <p className="text-slate-900 dark:text-white font-black text-xl mb-2">No Champions Yet.</p>
              <p className="text-slate-400 font-medium text-sm">Win a negotiation to claim your spot.</p>
            </div>
          )}
        </section>

        {/* --- Final CTA --- */}
        <section className="max-w-6xl mx-auto px-6 py-40">
          <div className="bg-slate-900 dark:bg-white rounded-[3.5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <h2 className="text-5xl md:text-8xl font-black text-white dark:text-black tracking-tighter mb-12 relative z-10 leading-[0.85]">
              Ready to <br /> Outsmart?
            </h2>
            <Link to={user ? "/dashboard" : "/register"} className="inline-block relative z-10 px-12 py-6 rounded-full bg-white dark:bg-black text-black dark:text-white font-black text-xl hover:scale-110 active:scale-95 transition-transform duration-300 whitespace-nowrap">
              {/* {user ? "Enter Dashboard" : "Join the Arena"}
               */}
               Join the Arena
            </Link>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-white dark:bg-black border-t border-slate-100 dark:border-white/5 py-6 text-center text-slate-400 text-xs tracking-[0.2em] font-bold uppercase transition-colors">
        <div className="ml-4 mx-auto px-2 flex flex-col items-center gap-5">
          <div className="flex  items-center gap-3 text-slate-900 dark:text-white text-lg lowercase tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center  text-white font-bold">d</div>
            DealCraft AI
          </div>
          {/* <div className="flex gap-12">
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Github</a>
          </div> */}
          {/* <p className="opacity-40 self-start">© 2026 DealCraft. Engineering Visuals.</p> */}
          <p className="">Made with ❤️ by <a href="https://github.com/fardeen-99" className="hover:text-indigo-500 transition-colors ">Fardeen</a></p>
        </div>
      </footer>

      {/* Custom Styles for Keyframes */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;