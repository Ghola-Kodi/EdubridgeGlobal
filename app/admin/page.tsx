"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [files, setFiles]  = useState<any[]>([]);

  useEffect(()=>{
    if (status==="unauthenticated") router.push("/login");
    if (status==="authenticated") {
      if ((session?.user as any)?.role !== "ADMIN") router.push("/dashboard");
      fetch("/api/consultations").then(r=>r.json()).then(setConsultations);
      fetch("/api/files").then(r=>r.json()).then(setFiles);
    }
  },[status, session]);

  if (status==="loading") return <div className="min-h-screen flex items-center justify-center"><p className="animate-pulse font-heading text-charcoal/40">Loading…</p></div>;

  const pending   = consultations.filter(c=>c.status==="PENDING").length;
  const confirmed = consultations.filter(c=>c.status==="CONFIRMED").length;
  const completed = consultations.filter(c=>c.status==="COMPLETED").length;

  const stats = [
    { label:"Total Bookings",   value: consultations.length, icon:"📅", color:"bg-primary" },
    { label:"Pending Review",   value: pending,              icon:"⏳", color:"bg-gold" },
    { label:"Confirmed",        value: confirmed,            icon:"✅", color:"bg-teal" },
    { label:"Files in Library", value: files.length,         icon:"📁", color:"bg-primary" },
  ];

  return (
    <div className="min-h-screen bg-soft-grey">
      <div className="bg-primary py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/60 mt-1">EdBridge Global – Management Portal</p>
          </div>
          <Link href="/admin/files" className="btn-primary">+ Upload File</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(s=>(
            <div key={s.label} className="bg-white rounded-xl shadow-sm border border-border p-5 text-center">
              <span className="text-3xl">{s.icon}</span>
              <p className="text-3xl font-heading font-bold text-primary mt-2">{s.value}</p>
              <p className="text-xs text-charcoal/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Admin Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {href:"/admin/consultations", label:"Manage Bookings",  icon:"📅"},
            {href:"/admin/clients",       label:"Manage Clients",   icon:"👥"},
            {href:"/admin/files",         label:"File Library",     icon:"📁"},
            {href:"/admin/messages",      label:"Messages",         icon:"✉️"},
          ].map(l=>(
            <Link key={l.href} href={l.href} className="bg-white border border-border rounded-xl p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-3xl">{l.icon}</span>
              <p className="font-heading font-bold text-primary text-sm mt-2">{l.label}</p>
            </Link>
          ))}
        </div>

        {/* Recent Consultations */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-primary text-lg">Recent Consultations</h3>
            <Link href="/admin/consultations" className="text-teal text-sm font-heading font-bold hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {["Name","Email","Service","Consultant","Date","Status","Action"].map(h=>(
                    <th key={h} className="pb-3 pr-4 font-heading text-xs uppercase tracking-wide text-charcoal/50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultations.slice(0,8).map((c:any)=>(
                  <tr key={c.id} className="border-b border-border/50 hover:bg-soft-grey/50 transition-colors">
                    <td className="py-3 pr-4 font-body text-charcoal">{c.name}</td>
                    <td className="py-3 pr-4 text-charcoal/70">{c.email}</td>
                    <td className="py-3 pr-4 text-charcoal/70 max-w-[160px] truncate">{c.service}</td>
                    <td className="py-3 pr-4 text-charcoal/70 capitalize">{c.founder}</td>
                    <td className="py-3 pr-4 text-charcoal/70">{new Date(c.date).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wide ${
                        c.status==="CONFIRMED"?"bg-teal/10 text-teal":
                        c.status==="COMPLETED"?"bg-green-100 text-green-700":
                        c.status==="CANCELLED"?"bg-red-100 text-red-600":
                        "bg-gold/10 text-gold-dark"
                      }`}>{c.status}</span>
                    </td>
                    <td className="py-3">
                      <button className="text-teal text-xs font-heading font-bold hover:underline">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {consultations.length===0 && <p className="text-center py-8 text-charcoal/40 text-sm">No consultations yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
