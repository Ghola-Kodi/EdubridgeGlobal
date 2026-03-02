"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(()=>{
    if (status==="unauthenticated") router.push("/login");
    if (status==="authenticated") {
      fetch("/api/consultations").then(r=>r.json()).then(setConsultations);
      fetch("/api/files").then(r=>r.json()).then(setFiles);
    }
  },[status]);

  if (status==="loading") return <div className="min-h-screen flex items-center justify-center"><p className="text-charcoal/50 font-heading animate-pulse">Loading…</p></div>;

  const stats = [
    { label:"My Consultations", value: consultations.length, icon:"📅" },
    { label:"Available Files",  value: files.length,          icon:"📄" },
    { label:"Completed",        value: consultations.filter(c=>c.status==="COMPLETED").length, icon:"✅" },
    { label:"Upcoming",         value: consultations.filter(c=>c.status==="CONFIRMED").length, icon:"🗓️" },
  ];

  return (
    <div className="min-h-screen bg-soft-grey">
      <div className="bg-primary py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-white">Welcome back, {session?.user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-white/60 mt-1">Manage your consultations and access your resources below.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Link href="/book-consultation" className="bg-primary rounded-xl p-6 flex items-center gap-4 hover:opacity-90 transition-opacity">
            <span className="text-4xl">📅</span>
            <div>
              <p className="font-heading font-bold text-white text-lg">Book a Consultation</p>
              <p className="text-white/60 text-sm">Schedule a session with Helen or David</p>
            </div>
          </Link>
          <Link href="/dashboard/files" className="bg-white border border-border rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <span className="text-4xl">📂</span>
            <div>
              <p className="font-heading font-bold text-primary text-lg">My Resources</p>
              <p className="text-charcoal/50 text-sm">Download guides, forms and materials</p>
            </div>
          </Link>
        </div>

        {/* Recent Consultations */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-bold text-primary text-lg mb-4">My Consultations</h3>
          {consultations.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-charcoal/40 font-body text-sm mb-4">No consultations booked yet.</p>
              <Link href="/book-consultation" className="btn-primary">Book Your First Session</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-heading text-xs uppercase tracking-wide text-charcoal/50">Service</th>
                    <th className="pb-3 font-heading text-xs uppercase tracking-wide text-charcoal/50">Consultant</th>
                    <th className="pb-3 font-heading text-xs uppercase tracking-wide text-charcoal/50">Date</th>
                    <th className="pb-3 font-heading text-xs uppercase tracking-wide text-charcoal/50">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((c:any)=>(
                    <tr key={c.id} className="border-b border-border/50 hover:bg-soft-grey/50 transition-colors">
                      <td className="py-3 font-body text-charcoal">{c.service}</td>
                      <td className="py-3 text-charcoal/70 capitalize">{c.founder}</td>
                      <td className="py-3 text-charcoal/70">{new Date(c.date).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wide ${
                          c.status==="CONFIRMED"?"bg-teal/10 text-teal":
                          c.status==="COMPLETED"?"bg-green-100 text-green-700":
                          c.status==="CANCELLED"?"bg-red-100 text-red-600":
                          "bg-gold/10 text-gold-dark"
                        }`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
