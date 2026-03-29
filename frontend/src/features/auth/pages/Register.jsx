import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/auth.hook"
import { useTheme } from "../../../context/ThemeContext"
import { useSelector } from "react-redux"

const Register=()=>{

    const navigate=useNavigate();
    const {handleRegister}=useAuth();

    const [form,setForm]=useState({
        username:"",
        email:"",
        password:""
    })

    const submiter=async(e)=>{
        e.preventDefault();
        await handleRegister(form);
        setForm({
            username:"",
            email:"",
            password:""
        })
        navigate("/dashboard");
    }

const {theme}=useTheme()

const {user}=useSelector((state)=>state.auth)

if(user){
   return <Navigate to="/dashboard"/>
}

    return(
        <div
  className={`relative min-h-screen overflow-hidden ${
    theme === "dark"
      ? "bg-[radial-gradient(circle_at_top,_#1a1a2e_0%,_#16213e_35%,_#0f3460_66%,_#000000_100%)] text-white"
      : "bg-[radial-gradient(circle_at_top,_#f8f1ff_0%,_#f0f7ff_35%,_#efd8ff_66%,_#5b1f83_100%)] text-slate-900"
  } px-4 py-8 sm:px-6 lg:px-8`}
>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-[-6rem] top-[-5rem] h-52 w-52 rounded-full bg-white/30 blur-3xl" />
                <div className="absolute bottom-[-12rem] left-[-5rem] h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/15 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/12 shadow-[0_30px_120px_rgba(76,29,149,0.28)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="relative flex min-h-[360px] flex-col justify-between overflow-hiddep-6 text-white sm:p-8 lg:p-10">
                     

<img src="/photo4.jpg" alt="" className="absolute   bottom-0 right-0 w-full h-full object-cover z-[-10]" />

                        <div className="relative flex items-center justify-between">
                            {/* <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">DealCraft</p>
                                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-cyan-100/80">Launch Sequence</p>
                            </div> */}
                            <div>
{/* 
                               <p className="text-sm font-medium uppercase tracking-[0.35em] text-fuchsia-100/80">Create your account</p>
                               <h1 className="mt-4 text-sm font-black leading-none tracking-tight sm:text-2xl">
                                Enter the arena with
                                <span className="mt-2 block text-cyan-200">a standout first impression.</span>
                            </h1> */}
                            </div>
                       
                            <div className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                                Register
                            </div>
                        </div>

                        
                    </section>

                    <section className="bg-white/88 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
                        <div className="mx-auto flex h-full max-w-md flex-col justify-center">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">Start Here</p>
                                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Create Account</h2>
                                </div>
                                <Link
                                    to="/login"
                                    className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-600 transition hover:border-violet-300 hover:text-violet-600"
                                >
                                    Login
                                </Link>
                            </div>

                            <p className="mt-4 text-sm leading-7 text-slate-500">
                                Keep it clean and direct: username, email, password, and the route into the app.
                            </p>

                            <form
                                className="mt-10 flex flex-col gap-5"
                                onSubmit={submiter}
                            >
                                <label className="flex flex-col gap-2">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Username</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-violet-400 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.14)]"
                                        type="text"
                                        placeholder="Choose a username"
                                        autoComplete="username"
                                        value={form.username}
                                        onChange={(e)=>setForm({...form,username:e.target.value})}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Email</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-violet-400 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.14)]"
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={(e)=>setForm({...form,email:e.target.value})}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Password</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-violet-400 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.14)]"
                                        type="password"
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        value={form.password}
                                        onChange={(e)=>setForm({...form,password:e.target.value})}
                                    />
                                </label>

                                <button
                                    className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f172a,_#7c3aed_52%,_#0891b2)] px-6 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white shadow-[0_22px_45px_rgba(76,29,149,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(76,29,149,0.36)]"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </form>

                            <p className="mt-8 text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link to="/login" className="font-bold text-violet-600 transition hover:text-violet-700">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Register
