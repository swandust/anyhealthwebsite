// src/components/HomePage.tsx
import React, { useState } from "react";
import {
  Users,
  Stethoscope,
  Clock,
  Award,
  ArrowRight,
  Brain,
  Building2,
} from "lucide-react";

import logo2 from "../assets/3.svg";
import gpImg from "../assets/GP2.svg"; // remove if you don't have this asset
import PhoneChat from "./PhoneChat";
import WorkflowSection from "./WorkflowSection";
import { AnimatePresence, motion } from "framer-motion";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

type Zone = {
  id: "gp" | "specialist" | "hospital";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  benefits: string;
};

const zones: Zone[] = [
  {
    id: "gp",
    title: "PHC / GP Clinic",
    subtitle: "Smarter, calmer clinic ops",
    icon: <Stethoscope className="w-7 h-7 md:w-8 md:h-8" />,
    gradient: "from-blue-400 to-indigo-600",
    benefits:
      "Automate bookings, speed up notes, and track recovery without changing the way you work.",
  },
  {
    id: "specialist",
    title: "Specialist Access",
    subtitle: "Fast triage, clear handoffs",
    icon: <Brain className="w-7 h-7 md:w-8 md:h-8" />,
    gradient: "from-purple-400 to-pink-600",
    benefits:
      "Prioritise referrals, align with referring GPs, and push structured aftercare tasks back to primary care.",
  },
  {
    id: "hospital",
    title: "Hospital Integration",
    subtitle: "Seamless acute → follow-up",
    icon: <Building2 className="w-7 h-7 md:w-8 md:h-8" />,
    gradient: "from-red-400 to-orange-600",
    benefits:
      "Coordinate ER referrals, monitor inpatients, and manage outpatient follow-up with shared context.",
  },
];

const stats = [
  {
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    value: "Join Now",
    label: "Active Users",
  },
  {
    icon: <Stethoscope className="w-6 h-6 md:w-8 md:h-8" />,
    value: "Expanding",
    label: "Healthcare Providers",
  },
  {
    icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
    value: "24/7",
    label: "Support Available",
  },
  {
    icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
    value: "99.9%",
    label: "Uptime Guarantee",
  },
];

// modal copy
const contentById = {
  gp: {
    headline: "Smart daily ops for GP clinics",
    blurb:
      "A lightweight layer that removes friction—so your team can focus on care, not clicks.",
    featuresTitle: "What you get",
    features: [
      "Smart scheduling (auto-stack, auto-remind)",
      "1-click summaries (from structured notes)",
      "Recovery tracking (nudges + dashboards)",
      "Role-based access for front desk, nurses, GPs",
    ],
  },
  specialist: {
    headline: "Specialist triage & shared aftercare",
    blurb:
      "Triage referrals fast with key context, then hand back clear, structured aftercare to referring GPs.",
    featuresTitle: "Designed for specialists",
    features: [
      "Prioritised referral inbox with flags",
      "One-tap request for missing info/tests",
      "Aftercare checklists pushed to GP",
      "Outcomes tracking across partners",
    ],
  },
  hospital: {
    headline: "A connected hospital experience",
    blurb:
      "Tighter loops from ER to wards to clinic. Everyone sees the same plan, at the right time.",
    featuresTitle: "For hospital teams",
    features: [
      "Emergency referral routing with SLAs",
      "Inpatient board with real-time signals",
      "Outpatient follow-up orchestration",
      "Staff assignment & shift visibility",
    ],
  },
} as const;

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showChoice, setShowChoice] = useState(false);
  const [openZone, setOpenZone] = useState<Zone | null>(null);

  return (
    <div className="bg-white">
      {/* HERO with semicircle gradient */}
      <section className="relative overflow-hidden">
        <div
          className="
            absolute left-1/2 -translate-x-1/2 top-0
            w-[140%] sm:w-[135%] md:w-[130%] h-[420px] sm:h-[480px] md:h-[520px]
            bg-gradient-to-b from-[#4F997FCC] to-white
            rounded-b-[100%]
            pointer-events-none
          "
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 mt-12 md:mt-16">
          <div className="text-center mb-10 sm:mb-12">
            <img
              src={logo2}
              alt="AnyHealth"
              className="mx-auto h-40 sm:h-56 md:h-72 w-auto drop-shadow-sm"
              style={{ objectFit: "contain" }}
            />
            <div className="mt-10 sm:mt-16 md:mt-24">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Malaysia&apos;s 1st E-referral System
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Connecting patients, providers, and healthcare excellence
              </p>
            </div>

            {/* CTAs — split-in-place, no popup */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <motion.div
                layout
                className="inline-flex"
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <AnimatePresence initial={false} mode="wait">
                  {!showChoice ? (
                    // single button (closed)
                    <motion.button
                      key="closed"
                      layout
                      onClick={() => setShowChoice(true)}
                      className="
                        inline-flex items-center justify-center
                        px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold
                        border border-[#4F997F] text-[#0b3a2f]
                        transition-all duration-200
                        hover:bg-[#4F997F] hover:text-white
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2
                        shadow-sm hover:shadow-md
                      "
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                    >
                      I am a…
                    </motion.button>
                  ) : (
                    // split buttons (open)
                    <motion.div
                      key="open"
                      layout
                      className="
                        inline-flex items-stretch rounded-full overflow-hidden
                        ring-1 ring-[#4F997F] shadow-sm bg-white
                      "
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                    >
                      {/* Patient */}
                      <button
                        onClick={() => {
                          setShowChoice(false);
                          setTimeout(() => onNavigate("solutions"), 120);
                        }}
                        className="
                          px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold
                          bg-[#4F997F] text-white hover:opacity-90 transition-colors
                        "
                      >
                        Patient
                        <span className="ml-2 hidden sm:inline text-white/90 font-normal">
                          · book clinic appointments
                        </span>
                      </button>

                      <div className="w-px bg-emerald-300/60" />

                      {/* Provider */}
                      <button
                        onClick={() => {
                          setShowChoice(false);
                          setTimeout(() => onNavigate("who"), 120);
                        }}
                        className="
                          px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold
                          bg-white text-[#0b3a2f] hover:bg-emerald-50 transition-colors
                        "
                      >
                        Provider
                        <span className="ml-2 hidden sm:inline text-emerald-900/80 font-normal">
                          · doctors, nurses, hospitals
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Request Demo (kept inline; same visual weight) */}
              <a
                href="https://calendly.com/anyhealth-sg/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold
                  border border-gray-300 text-gray-900 hover:bg-gray-50
                  transition-all duration-200
                "
              >
                Request Demo
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-6 sm:pt-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 bg-[#4F997F14] text-[#4F997F]">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <div className="pt-0">
        <WorkflowSection />
      </div>

      {/* Solutions */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center px-4 sm:px-10 mb-6 sm:mb-8">
        Explore Our Products
      </h2>

      <section id="solutions" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Patients demo */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-50 to-teal-50 ring-1 ring-emerald-200/60 shadow-xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold">For Patients</h3>
              <p className="mt-1 text-gray-700 text-base sm:text-lg">
                Book appointments and manage your health seamlessly via WhatsApp.
              </p>
            </div>
            <PhoneChat />
          </div>

          {/* Providers (three across on desktop) */}
          <div
            id="who"
            className="pt-8 sm:pt-10 mt-10 sm:mt-14 mb-20 sm:mb-28 rounded-3xl bg-white ring-1 ring-gray-200/70 shadow-xl p-5 sm:p-6 md:p-10"
          >
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl font-semibold">For Providers</h3>
              <p className="text-base sm:text-xl text-slate-700 max-w-3xl mx-auto">
                Tools for GP clinics, specialists, and hospitals to streamline referrals and aftercare.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setOpenZone(zone)}
                  className="text-left group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-6 md:p-8
                             transform transition-all duration-500 hover:scale-105 hover:bg-gray-100 shadow-sm focus:outline-none"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${zone.gradient} opacity-0
                                group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${zone.gradient}
                                flex items-center justify-center text-white mb-5 md:mb-6
                                group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                  >
                    {zone.icon}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-2">
                      {zone.title}
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base mb-3 md:mb-4">
                      {zone.subtitle}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mb-4 md:mb-6">
                      {zone.benefits}
                    </p>
                    <span className="inline-flex items-center text-emerald-700 font-semibold gap-2
                                     group-hover:gap-3 transition-all duration-300 text-sm md:text-base">
                      Explore Zone
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 text-center">
              <button
                onClick={() => onNavigate("providers")}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-2xl shadow-lg backdrop-blur-sm hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                Explore All Services →
              </button>
            </div>
          </div>

          {/* Modal for zones */}
          {openZone && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
              onKeyDown={(e) => e.key === "Escape" && setOpenZone(null)}
            >
              {/* backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setOpenZone(null)}
              />

              {/* panel */}
              <div className="relative z-10 w-full max-w-[92vw] sm:max-w-2xl md:max-w-4xl rounded-2xl md:rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                {/* header */}
                <div className="flex items-center gap-3 p-3 sm:p-4 border-b">
                  <button
                    className="shrink-0 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
                    onClick={() => setOpenZone(null)}
                    aria-label="Close"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-r ${openZone.gradient} text-white grid place-items-center shadow`}
                    >
                      <span className="sr-only">{openZone.title}</span>
                    </div>
                    <div>
                      <div className="text-sm md:text-base font-semibold text-gray-900">
                        {openZone.title}
                      </div>
                      <div className="text-[11px] md:text-xs text-gray-500">
                        {openZone.subtitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* scrollable body */}
                <div className="max-h-[85vh] overflow-y-auto">
                  <div
                    className={`grid gap-0 ${
                      openZone.id === "gp" ? "md:grid-cols-2" : "md:grid-cols-1"
                    }`}
                  >
                    {/* media — only for GP */}
                    {openZone.id === "gp" && (
                      <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r">
                        <div className="w-full rounded-2xl bg-white border flex items-center justify-center p-3 sm:p-4">
                          <img
                            src={gpImg}
                            alt="GP"
                            className="w-full h-auto max-h-56 sm:max-h-64 md:max-h-80 object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      {openZone.id === "gp" && (
                        <>
                          <h5 className="text-base md:text-lg font-semibold text-gray-900">
                            {contentById.gp.headline}
                          </h5>
                          <p className="mt-2 text-sm text-gray-600">
                            {contentById.gp.blurb}
                          </p>

                          <h6 className="mt-5 md:mt-6 text-sm font-semibold text-gray-900">
                            {contentById.gp.featuresTitle}
                          </h6>
                          <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc pl-5">
                            {contentById.gp.features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {openZone.id === "specialist" && (
                        <>
                          <h5 className="mt-1 text-base md:text-lg font-semibold text-gray-900">
                            {contentById.specialist.headline}
                          </h5>
                          <p className="mt-2 text-sm text-gray-600">
                            {contentById.specialist.blurb}
                          </p>

                          <h6 className="mt-5 md:mt-6 text-sm font-semibold text-gray-900">
                            {contentById.specialist.featuresTitle}
                          </h6>
                          <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc pl-5">
                            {contentById.specialist.features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {openZone.id === "hospital" && (
                        <>
                          <h5 className="mt-1 text-base md:text-lg font-semibold text-gray-900">
                            {contentById.hospital.headline}
                          </h5>
                          <p className="mt-2 text-sm text-gray-600">
                            {contentById.hospital.blurb}
                          </p>

                          <h6 className="mt-5 md:mt-6 text-sm font-semibold text-gray-900">
                            {contentById.hospital.featuresTitle}
                          </h6>
                          <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc pl-5">
                            {contentById.hospital.features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* footer actions */}
                      <div className="mt-6 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOpenZone(null)}
                          className="px-4 py-2 rounded-full border text-gray-700 hover:bg-gray-50 text-sm md:text-base"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end scrollable body */}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-10 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Malaysia&apos;s Healthcare Experience?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
            Join our network of Clinics and Hospitals and empower your patients today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:contact@anyhealth.asia"
              className="px-6 sm:px-8 py-3 md:py-4 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Contact Us
            </a>
            <a
              href="https://calendly.com/anyhealth-sg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
