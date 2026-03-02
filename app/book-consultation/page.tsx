"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const services = [
  "International Curriculum Training","School Placement","Career Guidance & Counselling",
  "University Placement Abroad","Professional Development for Educators",
  "Student Motivation Programmes","Team Building & Workshops",
  "School Quality Assessment & Audits","School Start-Up Consultancy",
  "Teacher Recruitment & Placement","General Enquiry",
];

const timeSlots = ["09:00 AM","10:00 AM","11:00 AM","01:00 PM","02:00 PM","03:00 PM","04:00 PM"];

const founders = [
  { slug: "helen", name: "Helen Njeri Kamau",   title: "Co-Founder & CEO" },
  { slug: "david", name: "David Ouma Achieng",  title: "Co-Founder & Director of Operations" },
];

export default function BookConsultationPage() {
  const params       = useSearchParams();
  const preFounder   = params.get("founder") ?? "";
  const preFounderName = params.get("name") ?? "";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { founder: preFounder || "helen" }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      reset();
      toast.success("Consultation booked! We will confirm shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-grey">
      <section className="bg-primary py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="section-label">Book a Session</span>
          <h1 className="text-4xl font-heading font-bold text-white mt-2">
            {preFounderName ? `Book a Consultation with ${preFounderName}` : "Book a Consultation"}
          </h1>
          <div className="divider mx-auto mt-3"/>
          <p className="text-white/70 mt-4">Choose your preferred founder, service, date and time. We will confirm your booking within one business day.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {success ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">Booking Received!</h2>
              <p className="text-charcoal/70 mb-8">Thank you! Our team will confirm your consultation within one business day via email.</p>
              <button onClick={()=>setSuccess(false)} className="btn-primary">Book Another Session</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-md p-8 lg:p-10 flex flex-col gap-5">
              <h3 className="text-xl font-heading font-bold text-primary">Your Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input {...register("name",{required:true})} placeholder="Your full name" className={`input-field ${errors.name?"border-red-400":""}`}/>
                </div>
                <div>
                  <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" {...register("email",{required:true})} placeholder="your@email.com" className={`input-field ${errors.email?"border-red-400":""}`}/>
                </div>
                <div>
                  <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Phone</label>
                  <input type="tel" {...register("phone")} placeholder="+254 700 000 000" className="input-field"/>
                </div>
                <div>
                  <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Service of Interest *</label>
                  <select {...register("service",{required:true})} className={`input-field ${errors.service?"border-red-400":""}`}>
                    <option value="">Select a service…</option>
                    {services.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-primary pt-2">Choose Your Consultant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {founders.map(f=>(
                  <label key={f.slug} className="relative cursor-pointer">
                    <input type="radio" {...register("founder",{required:true})} value={f.slug} className="sr-only peer"/>
                    <div className="border-2 border-border rounded-xl p-4 peer-checked:border-gold peer-checked:bg-gold/5 transition-all duration-200">
                      <p className="font-heading font-bold text-primary text-sm">{f.name}</p>
                      <p className="text-xs text-charcoal/60 mt-0.5">{f.title}</p>
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-border peer-checked:border-gold peer-checked:bg-gold hidden"></span>
                    </div>
                  </label>
                ))}
              </div>

              <h3 className="text-xl font-heading font-bold text-primary pt-2">Preferred Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Date *</label>
                  <input type="date" {...register("date",{required:true})} className={`input-field ${errors.date?"border-red-400":""}`} min={new Date().toISOString().split("T")[0]}/>
                </div>
                <div>
                  <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Time Slot *</label>
                  <select {...register("timeSlot",{required:true})} className={`input-field ${errors.timeSlot?"border-red-400":""}`}>
                    <option value="">Select a time…</option>
                    {timeSlots.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-heading text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Additional Notes</label>
                <textarea {...register("message")} rows={4} placeholder="Any specific questions or context for the session…" className="input-field resize-none"/>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base mt-2">
                {loading ? "Booking…" : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

