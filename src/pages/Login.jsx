import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import {LogIn, UserRoundPlus} from "lucide-react";
import {login, signup} from "../services/authService";

export default function Login() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/");
      } 
      else {
        await signup(email, password);
        setVerificationSent(true);
      }
    } 
    catch (error) {
      alert(error.message);
    } 
    finally {
      setLoading(false);
    }
  }

  if (verificationSent) {
    return (
      <div className=" min-h-screen flex items-center justify-center px-6  text-white " >
        <div className=" w-full max-w-md backdrop-blur-xl  bg-white/5 border border-white/10 rounded-3xl p-8 text-center " >
          <h1 className="text-3xl font-semibold mb-4">
            Verify Your Email
          </h1>
          <p className="text-white/70 leading-relaxed">
            A verification link has been sent to:
          </p>
          <p className="mt-3 font-medium break-all">
            {email}
          </p>
          <p className="mt-6 text-sm text-white/50">
            Once verified, return and login to enter
            your Memory Palace.
          </p>
        </div>
      </div>
    );
  }

  return (
      <div className="flex items-start justify-center px-6 py-5 text-white relative overflow-hidden " >
        <div className="w-full max-w-md bg-cardBg/90 border border-borderClr rounded-[28px] px-10 py-12 backdrop-blur-md shadow-2xl relative z-10 " >
      <h1 className=" font-cinzelDecorative  text-primaryText text-3xl text-center tracking-wide mb-10 " >
        Memory Palace
      </h1>

      <form onSubmit={handleAuth} className="flex flex-col gap-5" >
        <div className="flex flex-col gap-2">
          <label className=" text-xs  text-white/70 tracking-wide " >
            Email
          </label> 
          <input type="email" placeholder="" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value) }
            required className=" h-11 bg-transparent border  border-white/20 rounded-md px-4 outline-none text-sm  focus:border-primaryText transition "
          /> 
        </div> 
        <div className="flex flex-col gap-2"> 
          <label className=" text-xs  text-white/70 tracking-wide " >
            Password
          </label> 
          <input type="password" placeholder="" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value) }
            required className=" h-11 bg-transparent border  border-white/20 rounded-md px-4 outline-none text-sm  focus:border-primaryText transition "
          /> 
        </div> 
        <button disabled={loading} className=" mt-2 h-11  bg-black border  border-white/10 rounded-md text-sm font-medium  hover:bg-white/5 transition disabled:opacity-50 " >
          {
            loading
              ? "Loading..."
              : isLogin
              ? (
                <span className="flex items-center justify-center gap-2">
                  <LogIn size={18} />
                  Enter the Palace
                </span>
              )
              : (
                <span className="flex items-center justify-center gap-2">
                  <UserRoundPlus size={18} />
                  Create Your Palace
                </span>
              )
          } 
        </button> 
      </form> 
      <button onClick={() => setIsLogin(!isLogin) } className=" mt-10 w-full text-center text-xs  text-primaryText/60  hover:text-primaryText transition " >
        {
          isLogin
            ? (
              <>
                New traveler?{" "}
                <span className="underline">
                  Register name
                </span>
              </>
            )
            : (
              <>
                Already inscribed?{" "} 
                <span className="underline">
                  Unlock vault
                </span>
              </>
            )
        }
      </button>
    </div>
  </div>
  );
}