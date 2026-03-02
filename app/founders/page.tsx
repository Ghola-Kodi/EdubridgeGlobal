import Link from "next/link";
import Image from "next/image";

const founders = [
  {
    name:    "Helen Njeri Kamau",
    title:   "Co-Founder & CEO",
    slug:    "helen",
    image:   "/founders/helen.jpg",
    bio:     "Helen is a seasoned education consultant with over 15 years of experience in international curriculum development, school leadership coaching, and student transition support. She holds a Masters in Education Leadership from the University of Nairobi and is a certified Cambridge International Education trainer. Helen has worked with over 120 schools across East Africa, helping them transition to world-class curricula and build high-performing teams. Her personal commitment to education equity drives EdBridge Global's mission to make quality guidance accessible to every learner.",
    qualifications: ["M.Ed – Education Leadership, University of Nairobi","Cambridge International Education Trainer","IB Curriculum Consultant","School Governance Specialist"],
    linkedin: "#",
    email:   "helen@edbridgeglobal.com",
  },
  {
    name:    "David Ouma Achieng",
    title:   "Co-Founder & Director of Operations",
    slug:    "david",
    image:   "/founders/david.jpg",
    bio:     "David brings a wealth of expertise in university placement strategy, career counselling, and institutional partnerships across Africa and Europe. With a background in International Relations and Education Management, David has helped over 500 students secure placements in top universities across the UK, USA, Canada, and Australia. He leads EdBridge Global's partnerships with international institutions and scholarship bodies, and champions the company's professional development programmes for educators. David is passionate about empowering young Africans to access global opportunities.",
    qualifications: ["B.A. – International Relations, University of Dar es Salaam","Postgraduate Diploma, Education Management","Certified Career Development Facilitator","UK University Placement Advisor (UCAS Qualified)"],
    linkedin: "#",
    email:   "david@edbridgeglobal.com",
  },
];

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-soft-grey">
      {/* Page Hero */}
      <section className="bg-primary py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="section-label">Leadership</span>
          <h1 className="text-4xl font-heading font-bold text-white mt-2">Meet Our Founders</h1>
          <div className="divider mx-auto mt-3"/>
          <p className="text-white/70 text-lg mt-4">EdBridge Global was built by educators, for educators. Our founders bring decades of combined experience in international education, student guidance, and institutional development.</p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {founders.map((founder, i) => (
            <div key={founder.slug} className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row ${i%2!==0?"lg:flex-row-reverse":""}`}>
              {/* Image */}
              <div className="lg:w-[380px] shrink-0 relative min-h-[400px] bg-soft-grey">
                <Image
                  src={founder.image}
                  alt={`${founder.name} – ${founder.title}`}
                  fill
                  className="object-cover"
                  onError={(e:any)=>{e.currentTarget.src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600";}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"/>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-heading font-bold text-white text-xl">{founder.name}</p>
                  <p className="text-gold text-sm font-semibold">{founder.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary mb-1">{founder.name}</h2>
                  <p className="text-gold font-semibold text-sm mb-4">{founder.title}</p>
                  <div className="divider"/>
                  <p className="text-charcoal/80 leading-relaxed text-[16px] mt-4 mb-6">{founder.bio}</p>
                  <div className="mb-6">
                    <h4 className="font-heading font-bold text-primary text-sm uppercase tracking-wider mb-3">Qualifications & Expertise</h4>
                    <ul className="flex flex-col gap-2">
                      {founder.qualifications.map((q)=>(
                        <li key={q} className="flex items-start gap-2 text-sm text-charcoal/70">
                          <span className="text-gold mt-0.5">✓</span>{q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 pt-6 border-t border-border">
                  <Link
                    href={`/book-consultation?founder=${founder.slug}&name=${encodeURIComponent(founder.name.split(" ")[0])}`}
                    className="btn-primary"
                  >
                    📅 Book Consultation with {founder.name.split(" ")[0]}
                  </Link>
                  <a href={`mailto:${founder.email}`} className="btn-teal">✉ Email {founder.name.split(" ")[0]}</a>
                  <a href={founder.linkedin} className="flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold text-xs uppercase px-5 py-3 rounded-md hover:bg-primary hover:text-white transition-all duration-200">
                    in LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
