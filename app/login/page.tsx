"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      toast.success("Welcome back!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-soft-grey flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 lg:p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center font-heading font-bold text-2xl text-gold mx-auto mb-4">E</div>
          <h1 className="text-2xl font-heading font-bold text-primary">Sign In to EdBridge</h1>
          <p className="text-charcoal/50 text-sm mt-1">Access your dashboard and resources</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required className="input-field"/>
          </div>
          <div>
            <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required className="input-field"/>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-2">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-6 pt-6 border-t border-border">
          <p className="text-sm text-charcoal/50">Don't have an account? <Link href="/register" className="text-teal font-semibold hover:underline">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}
