"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const services = [
  { label: "International Curriculum Training", href: "/services#curriculum" },
  { label: "School Placement",                  href: "/services#placement" },
  { label: "Career Guidance & Counselling",     href: "/services#career" },
  { label: "University Placement Abroad",       href: "/services#university" },
  { label: "Professional Development",          href: "/services#professional" },
  { label: "Student Motivation Programmes",     href: "/services#motivation" },
  { label: "Team Building & Workshops",         href: "/services#teambuilding" },
  { label: "School Quality Assessment",         href: "/services#assessment" },
  { label: "School Start-Up Consultancy",       href: "/services#startup" },
  { label: "Teacher Recruitment & Placement",   href: "/services#recruitment" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-heading font-bold text-lg text-primary">E</div>
          <span className="font-heading font-bold text-white text-lg">EdBridge <span className="text-gold">Global</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {[["Home","/"],["About Us","/about"],["Founders","/founders"],["Blog","/blog"],["Testimonials","/testimonials"]].map(([label,href])=>(
            <Link key={href} href={href} className="font-heading text-sm font-semibold text-white/80 hover:text-gold transition-colors">{label}</Link>
          ))}
          {/* Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 font-heading text-sm font-semibold text-white/80 hover:text-gold transition-colors">
              Services <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
              {services.map((s) => (
                <Link key={s.href} href={s.href} className="block px-4 py-2.5 text-sm text-charcoal hover:bg-soft-grey hover:text-primary transition-colors">{s.label}</Link>
              ))}
            </div>
          </div>

          {session ? (
            <>
              <Link href={role==="ADMIN" ? "/admin" : "/dashboard"} className="font-heading text-sm font-semibold text-white/80 hover:text-gold transition-colors">
                {role==="ADMIN" ? "Admin" : "Dashboard"}
              </Link>
              <button onClick={()=>signOut()} className="font-heading text-sm font-semibold text-white/60 hover:text-gold transition-colors">Sign Out</button>
            </>
          ) : (
            <Link href="/login" className="font-heading text-sm font-semibold text-white/80 hover:text-gold transition-colors">Login</Link>
          )}
          <Link href="/book-consultation" className="btn-primary !py-2.5 !px-5 text-xs">Book Consultation</Link>
        </nav>

        {/* Hamburger */}
        <button className="lg:hidden text-white p-2" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="lg:hidden bg-primary border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {[["Home","/"],["About Us","/about"],["Founders","/founders"],["Blog","/blog"],["Testimonials","/testimonials"],["Contact","/contact"]].map(([l,h])=>(
            <Link key={h} href={h} onClick={()=>setOpen(false)} className="font-heading text-sm font-semibold text-white/80 py-3 border-b border-white/10 hover:text-gold transition-colors">{l}</Link>
          ))}
          <button onClick={()=>setServicesOpen(!servicesOpen)} className="flex items-center justify-between font-heading text-sm font-semibold text-white/80 py-3 border-b border-white/10 hover:text-gold transition-colors">
            Services <ChevronDown size={14} className={`transition-transform ${servicesOpen?"rotate-180":""}`}/>
          </button>
          {servicesOpen && services.map((s)=>(
            <Link key={s.href} href={s.href} onClick={()=>setOpen(false)} className="pl-4 font-body text-sm text-white/60 py-2 border-b border-white/5 hover:text-gold transition-colors">{s.label}</Link>
          ))}
          {session ? (
            <>
              <Link href={role==="ADMIN"?"/admin":"/dashboard"} onClick={()=>setOpen(false)} className="font-heading text-sm font-semibold text-white/80 py-3 border-b border-white/10 hover:text-gold transition-colors">Dashboard</Link>
              <button onClick={()=>{signOut();setOpen(false)}} className="font-heading text-sm text-white/60 py-3 text-left hover:text-gold transition-colors">Sign Out</button>
            </>
          ) : (
            <Link href="/login" onClick={()=>setOpen(false)} className="font-heading text-sm font-semibold text-white/80 py-3 border-b border-white/10 hover:text-gold transition-colors">Login</Link>
          )}
          <Link href="/book-consultation" onClick={()=>setOpen(false)} className="btn-primary text-center mt-3">Book Consultation</Link>
        </div>
      )}
    </header>
  );
}
