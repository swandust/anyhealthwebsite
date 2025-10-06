// src/components/ServicesPage.tsx
import {
  Home,
  Stethoscope,
  Phone,
  Calendar,
  FileText,
  Activity,
  Shield,
  Clock,
  Users,
  Award,
  Building,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import PricingPlans from "./PricingPlans";
import patientImg from "../assets/patient.svg";
import gpIMG from "../assets/gp.svg";




export default function ServicesPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* HERO */}
      <section className="py-18 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              For Providers
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              <span className="font-semibold">Grow your clinic. Delight your patients.</span>{" "}
              AnyHealth gives you the digital edge to attract, serve, and retain patients—while
              cutting admin time and unlocking new revenue.
            </p>
          </div>
        </div>
      </section>

{/* WHY CHOOSE ANYHEALTH */}
<section className="py-20 bg-gradient-to-b from-emerald-900/60 to-teal-900/40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-extrabold text-white">Why Clinics Choose AnyHealth</h2>
    <p className="mt-3 text-lg text-white/70 max-w-2xl mx-auto">
      Proven results that help you serve patients better while growing your clinic effortlessly.
    </p>

    {/* STATS GRID */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        {
          stat: "92%",
          label: "Patient Retention",
          desc: "Frictionless booking, reminders & follow-ups keep patients coming back."
        },
        {
          stat: "15h+",
          label: "Admin Saved / Week",
          desc: "Automation takes care of scheduling, referrals & summaries."
        },
        {
          stat: "100%",
          label: "Data Ownership",
          desc: "Secure, encrypted, and role-based access. You stay compliant."
        },
        {
          stat: "1 → 50+",
          label: "Clinics Scaled",
          desc: "Seamlessly grow from solo GP to multi-specialty practice."
        }
      ].map((card, i) => (
        <div 
          key={i} 
          className="flex flex-col items-center rounded-2xl bg-white/10 border border-white/20 p-8 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-5xl font-extrabold text-emerald-400">{card.stat}</span>
          <h3 className="mt-3 text-xl font-semibold text-white">{card.label}</h3>
          <p className="mt-2 text-white/70 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* PATIENT EXPERIENCE — WHATSAPP */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
    {/* Visual (left card + right image) */}
    <div className="order-2 md:order-1">
      <div className="relative rounded-3xl bg-slate-900 p-6 flex flex-col md:flex-row">
        {/* Left: feature card */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-600 text-white grid place-items-center">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Patient WhatsApp Platform</h3>
              <p className="text-white/60">Personal Health Management</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {[
              { icon: <Phone className="w-4 h-4" />, label: "WhatsApp booking" },
              { icon: <Calendar className="w-4 h-4" />, label: "Auto-reminders" },
              { icon: <FileText className="w-4 h-4" />, label: "Post-consult report" },
              { icon: <ArrowRight className="w-4 h-4" />, label: "Digital e-referral" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-white/80 flex items-center gap-2"
              >
                <span className="text-emerald-400">{f.icon}</span>
                <span className="text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image — purposely overflowing but contained */}
<div className="flex-1 relative flex items-center justify-center overflow-hidden">
  <img
    src={patientImg}
    alt="AnyHealth patient experience"
    className="relative w-[280px] md:w-[380px] lg:w-[480px] object-contain scale-140 translate-x-[30px] translate-y-6 drop-shadow-2xl"
  />
</div>


      </div>
    </div>

    {/* Copy */}
    <div className="order-1 md:order-2">
      <h2 className="text-3xl font-bold text-white">Patient Experience Reimagined</h2>
      <p className="mt-3 text-white/80">
        Your clinic on WhatsApp: make booking, reminders, referrals, and follow-ups effortless.
        The experience patients expect—with outcomes clinics love.
      </p>
      <ul className="mt-6 space-y-3 text-white/80">
        <li className="flex items-start gap-3">
          <span className="mt-1 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </span>
          <span>
            <strong className="text-white">Fewer no-shows:</strong> automated reminders &
            rescheduling keep your day on track.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </span>
          <span>
            <strong className="text-white">Higher satisfaction:</strong> clear post-consult
            summaries build trust and adherence.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </span>
          <span>
            <strong className="text-white">Keep patients in-network:</strong> digital
            e-referrals route to your trusted specialists fast.
          </span>
        </li>
      </ul>
    </div>
  </div>
</section>


      {/* GP DASHBOARD */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <h2 className="text-3xl font-bold text-white">The AnyHealth GP Dashboard</h2>
            <p className="mt-3 text-white/80">
              One workspace for bookings, consults, summaries, and referrals. Designed with doctors,
              pharmacists, and clinic admins in mind.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6 pt-10">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">All-in-One Patient Management</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Manage bookings & consults in one place
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Generate summaries in seconds
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Track recovery with timeline view
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Admin Made Easy</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    One-time digital registration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Auto-referrals & post-consult texts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Google Calendar sync for on-the-go doctors
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Smarter Operations</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Role-based access (doctor, pharmacist, staff)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Unified schedule view across doctors
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Pharmacy Integration</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Fast drug dosage entry
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Upload images/prescriptions via WhatsApp
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4 text-white/80 text-sm">
              <span className="font-semibold text-white">Data security that puts clinics first.</span>{" "}
              Clinic owns the database. Encrypted data. Unique staff logins.
            </div>
          </div>

          {/* Visual */}
          <div>
            <div className="rounded-3xl ring-1 ring-white/15 bg-white/5 border border-white/10 p-10 PY-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-600 text-white grid place-items-center">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">GP Clinic Dashboard</h3>
                  <p className="text-white/60">Primary Healthcare Solutions</p>
                </div>
              </div>
              <div className="flex items-center justify-center p-0 m-0 mb-0 overflow-hidden">
  <img
    src={gpIMG}
    alt="AnyHealth patient experience"
    className="scale-[1.6] object-cover m-0 max-h-[300px]"
  />
</div>

              <div className="mt-2 grid grid-cols-2 gap-4">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: "Smart scheduling" },
                  { icon: <FileText className="w-4 h-4" />, label: "1-click summaries" },
                  { icon: <Activity className="w-4 h-4" />, label: "Recovery tracking" },
                  { icon: <Shield className="w-4 h-4" />, label: "Role-based access" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-white/80 flex items-center gap-2"
                  >
                    <span className="text-emerald-400">{f.icon}</span>
                    <span className="text-sm">{f.label}</span>
                  </div>
                ))}
              </div>
               
        
            </div>
          </div>
        </div>
      </section>


      {/* FOR PROVIDERS INFO SECTION */}
<section className="py-20 bg-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-center text-white">For Healthcare Institutions</h2>
    <p className="mt-3 text-lg text-white/70 text-center max-w-2xl mx-auto">
      AnyHealth helps specialists and hospitals streamline referrals, reduce admin work, 
      and connect with the right patients faster.
    </p>

    <div className="mt-16 grid md:grid-cols-2 gap-10">
      {/* For Specialists */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-600 text-white grid place-items-center">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-white">For Specialists</h3>
        </div>
        <ul className="mt-6 space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
            <span>Receive e-referrals directly from AnyHealth GPs with full context.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
            <span>Manage availability and accept/reject referrals in one dashboard.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
            <span>Attract more patients by being discoverable in our specialist panel.</span>
          </li>
        </ul>
      </div>

      {/* For Hospitals */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-600 text-white grid place-items-center">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-white">For Hospitals</h3>
        </div>
        <ul className="mt-6 space-y-3 text-white/80">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-400 mt-1" />
            <span>Centralize specialist departments under one connected system.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-400 mt-1" />
            <span>Streamline inbound referrals and route patients to the right unit fast.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-400 mt-1" />
            <span>Strengthen partnerships with GPs while keeping patients in-network.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


      

      {/* SOCIAL PROOF / ADDITIONAL SERVICES */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Operational Confidence</h2>
            <p className="mt-3 text-white/70">
              Built for clinical rigor, data protection, and day-one reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Data Security & Privacy",
                desc: "Enterprise-grade encryption and role-based access.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Support",
                desc: "Round-the-clock technical assistance.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Multi-language",
                desc: "Accessible for diverse patient communities.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Compliance-Ready",
                desc: "Aligned with international healthcare standards.",
              },
            ].map((card, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-white/70 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
{/* PRICING PLANS */}
<PricingPlans />
      
                    {/* WHAT PROVIDERS GET */}
<section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-extrabold text-white">What You Get as a Provider</h2>
    <p className="mt-3 text-lg text-white/70 max-w-3xl mx-auto">
      When you subscribe to AnyHealth, you’re not just getting software—you’re joining a network that boosts your visibility, simplifies operations, and helps you deliver outstanding care. 
    </p>

    {/* Feature Grid */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          icon: <Users className="w-7 h-7" />,
          title: "Be Discoverable",
          desc: "Get listed in our specialist & hospital panels so patients can easily find and book your services."
        },
        {
          icon: <Calendar className="w-7 h-7" />,
          title: "Smart Scheduling",
          desc: "Reduce admin load with automated booking, reminders, and referral workflows."
        },
        {
          icon: <FileText className="w-7 h-7" />,
          title: "Digital Post-Consult",
          desc: "Provide patients with professional summaries and e-prescriptions instantly after visits."
        },
        {
          icon: <Stethoscope className="w-7 h-7" />,
          title: "Referral Network Access",
          desc: "Tap into our referral engine to connect with trusted GPs and specialists in real time."
        },
        {
          icon: <Shield className="w-7 h-7" />,
          title: "Security & Compliance",
          desc: "Encrypted databases, role-based logins, and privacy-first infrastructure built for healthcare."
        },
        {
          icon: <Award className="w-7 h-7" />,
          title: "Reputation Boost",
          desc: "Position your clinic as forward-thinking and tech-enabled, building patient trust and loyalty."
        },
      ].map((card, i) => (
        <div 
          key={i} 
          className="flex flex-col items-center rounded-2xl bg-white/10 border border-white/20 p-8 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform"
        >
          <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-600 text-white grid place-items-center rounded-xl mb-4">
            {card.icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{card.title}</h3>
          <p className="mt-2 text-white/70 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>







      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-white/90 mt-3">
            Get discovered via location-based search, deliver seamless digital experiences, and
            position your clinic as a forward-thinking provider.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {/* Keep these CTAs or replace with your in-app routing */}
            <a
              href="mailto:contact@anyhealth.asia"
              className="px-6 py-3 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow"
            >
              Talk to Us
            </a>
            <a
              href="https://calendly.com/anyhealth-sg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold rounded-full transition-all duration-300"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
