"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    router.push("/");
  };

  return (
    <div className="flex bg-[#FBF8F2] relative overflow-hidden">

      {/* ===================== LEFT SIDE - IMAGE (GROCERY) ===================== */}
      <div className="hidden lg:block lg: w-1/2  m-10  relative overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1605447813584-26aeb3f8e6ae"
          alt="Fresh grocery produce"
          className="absolute inset-0   animate-[imgZoom_16s_ease-in-out_infinite_alternate] "
        />

        {/* Overlay gradient for a premium feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(31,77,58,0.15) 0%, rgba(31,77,58,0.55) 100%)",
          }}
        />

        {/* Floating text on top of image */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-10 animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_both]">
          <h2
            className="text-white text-4xl font-bold leading-tight drop-shadow-md"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Join Us Today.
            <br />
            Shop Fresh, Live Well.
          </h2>
          <p className="text-white/80 mt-3 max-w-sm">
            Create an account and get access to the freshest groceries, delivered to your door.
          </p>
        </div>

        {/* Decorative floating blob */}
        <div
          className="pointer-events-none absolute top-10 right-10 h-40 w-40 rounded-full opacity-30 blur-3xl animate-[float_6s_ease-in-out_infinite]"
          style={{
            background: "radial-gradient(circle, #A8D95E, transparent 70%)",
          }}
        />
      </div>

      {/* ===================== RIGHT SIDE - REGISTER FORM ===================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 relative">

        {/* ambient glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #A8D95E, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #1F4D3A, transparent 70%)" }}
        />

        <div className="w-full max-w-md bg-white rounded-2xl border border-[#E7E1D3] shadow-[0_30px_60px_-20px_rgba(31,77,58,0.25)] p-8 relative z-10 animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4D3A] text-[#A8D95E] text-xl">
            🌿
          </div>

          <h1
            className="text-3xl font-bold text-center text-[#1F4D3A]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Create Account
          </h1>

          <p className="text-center text-[#26302A]/60 mt-2 mb-6">
            Register your account
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm text-[#26302A]">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#E7E1D3] rounded-lg px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#A8D95E] focus:border-[#1F4D3A]/30"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm text-[#26302A]">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-[#E7E1D3] rounded-lg px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#A8D95E] focus:border-[#1F4D3A]/30"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm text-[#26302A]">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-[#E7E1D3] rounded-lg px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#A8D95E] focus:border-[#1F4D3A]/30"
              />
            </div>

            {error && (
              <p className="text-[#E4572E] text-sm animate-[fadeUp_0.3s_ease-out_both]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F4D3A] hover:bg-[#16382A] text-[#FBF8F2] font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 hover:shadow-[0_10px_24px_-8px_rgba(31,77,58,0.5)] active:scale-[0.99]"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <span className="h-px flex-1 bg-[#E7E1D3]" />
            <span className="text-xs text-[#26302A]/40 uppercase tracking-wide">or</span>
            <span className="h-px flex-1 bg-[#E7E1D3]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#E7E1D3] bg-white px-4 py-3 text-sm font-semibold text-[#26302A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1F4D3A]/30 hover:bg-[#FBF8F2] hover:shadow-md active:translate-y-0"
          >
            <svg
              className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.16c1.85-1.7 2.9-4.2 2.9-7.22z"
              />
              <path
                fill="#34A853"
                d="M12 21.7c2.65 0 4.87-.88 6.49-2.38l-3.16-2.45c-.88.59-2 .94-3.33.94-2.56 0-4.73-1.73-5.51-4.06H3.22v2.53A9.8 9.8 0 0 0 12 21.7z"
              />
              <path
                fill="#FBBC05"
                d="M6.49 13.75A5.9 5.9 0 0 1 6.18 12c0-.61.11-1.2.31-1.75V7.72H3.22A9.8 9.8 0 0 0 2.2 12c0 1.58.38 3.07 1.02 4.28l3.27-2.53z"
              />
              <path
                fill="#EA4335"
                d="M12 6.19c1.44 0 2.73.49 3.75 1.46l2.81-2.81C16.87 3.25 14.65 2.3 12 2.3a9.8 9.8 0 0 0-8.78 5.42l3.27 2.53C7.27 7.92 9.44 6.19 12 6.19z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-[#26302A]/60 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-[#1F4D3A] font-semibold hover:text-[#16382A] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}