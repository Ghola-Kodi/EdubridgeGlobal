"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ name:"", email:"", password:"", organisation:"" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } else {
      toast.error("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div className="min-h-screen bg-soft-grey flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 lg:p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center font-heading font-bold text-2xl text-gold mx-auto mb-4">E</div>
          <h1 className="text-2xl font-heading font-bold text-primary">Create an Account</h1>
          <p className="text-charcoal/50 text-sm mt-1">Join EdBridge Global as a client</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            {label:"Full Name",     key:"name",         type:"text",     ph:"Your full name"},
            {label:"Email Address", key:"email",        type:"email",    ph:"your@email.com"},
            {label:"Organisation",  key:"organisation", type:"text",     ph:"School or company (optional)"},
            {label:"Password",      key:"password",     type:"password", ph:"Create a strong password"},
          ].map(f=>(
            <div key={f.key}>
              <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">{f.label}</label>
              <input type={f.type} value={(form as any)[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph} required={f.key!=="organisation"} className="input-field"/>
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-2">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <div className="text-center mt-6 pt-6 border-t border-border">
          <p className="text-sm text-charcoal/50">Already have an account? <Link href="/login" className="text-teal font-semibold hover:underline">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}

