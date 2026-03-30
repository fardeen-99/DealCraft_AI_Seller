import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGame } from "../hooks/game.hook";
import { useTheme } from "../../../context/ThemeContext";
import { setmessages, setloading } from "../chat.slice";
import useAuth from "../../auth/hooks/auth.hook";
import axios from "axios";

const GameSession = () => {
  const { sessionId } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();
  const [offer, setOffer] = useState("");
  const [message, setMessage] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const scrollRef = useRef(null);

  const fetchSession = async () => {
    try {
      const res = await axios.get(`/api/game/${sessionId}`, { withCredentials: true });
      setSessionData(res.data);
      dispatch(setmessages(res.data.messages));
    } catch (err) {
      console.error(err);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendOffer = async (e) => {
    e.preventDefault();
    if (!offer || !message) return;

    try {
      dispatch(setloading(true));
      const res = await axios.post(
        "/api/game/offer",
        { sessionId, offer: Number(offer), message },
        { withCredentials: true }
      );

      // Update local messages and session state
      await fetchSession();
      setOffer("");
      setMessage("");
      dispatch(setloading(false));
    } catch (err) {
      console.error(err);
      dispatch(setloading(false));
    }
  };

  if (!sessionData) return null;

  const isGameOver = sessionData.status !== "active";

  return (
    <div className="h-screen bg-[#fafbff] dark:bg-black font-sans flex flex-col transition-colors duration-500 overflow-hidden">

      {/* --- Top Navigation / Product HUD --- */}
      <header className="relative z-20 border-b border-slate-100 dark:border-white/5 bg-white/70 dark:bg-black/70 backdrop-blur-2xl px-6 py-4 flex gap-3 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
            <svg className="w-6 h-6 text-transparent  md:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-3">
            <img src={sessionData.product.image || "/placeholder.jpg"} className="w-10 h-10 rounded-lg object-cover border border-slate-100 dark:border-white/10" alt="" />
            <div>
              <h2 className="text-sm font-black text-slate-800  dark:text-white leading-tight">{sessionData.product.title}</h2>
              <p className="text-[10px] pt-1 text-slate-400 font-bold uppercase tracking-widest leading-relaxed md:leading-tight">Asking Price: ${sessionData.product.basePrice?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 ">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Current Deal</p>
            <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">${sessionData.currentPrice?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Rounds</p>
            <div className="flex gap-1">
              {[...Array(sessionData.maxRounds)].map((_, i) => (
                <div key={i} className={`h-1.5 w-4 rounded-full ${i < sessionData.rounds ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-white/10'}`} />
              ))}
            </div>
          </div>
          
          {/* Minimal Logout Button */}
          {/* <button 
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/20 transition-all active:scale-95"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button> */}
        </div>
      </header>

      {/* --- Chat Content --- */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-10 flex flex-col gap-8 scroll-smooth">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[80%] p-5 rounded-2xl break-words shadow-sm leading-relaxed text-sm font-medium ${msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm"
                  : "bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-tl-sm"
                }`}>
                {msg.message}
              </div>
              {msg.offer && (
                <span className="text-[10px] font-bold break-words text-slate-400 uppercase tracking-widest mt-2 px-1">
                  {msg.sender === "user" ? "Your Offer" : "AI Counter"}: ${msg.offer?.toLocaleString()}
                </span>
              )}
            </div>
          ))}

          {isGameOver && (
            <div className="mt-8 p-10 rounded-[3rem] bg-slate-900 dark:bg-white text-center shadow-2xl">
              <h3 className="text-3xl font-black text-white dark:text-black mb-4">
                Negotiation {sessionData.status === "won" ? "Successful! 🎉" : "Failed. 😞"}
              </h3>
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">
                Final Price: ${sessionData.currentPrice?.toLocaleString()}
              </p>
              <Link to="/dashboard" className="inline-block px-10 py-4 bg-indigo-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                Return to Dashboard
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* --- Input Container --- */}
      {!isGameOver && (
        <footer className="relative z-20 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-black p-6">
          <form onSubmit={handleSendOffer} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="flex-[0.4] relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 font-bold">$</div>
              <input
                type="number"
                placeholder="Your Offer"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-10 pr-5 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Persuade the seller..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 pr-35 text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2  focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !offer || !message}
                className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </form>
        </footer>
      )}

    </div>
  );
};

export default GameSession;
