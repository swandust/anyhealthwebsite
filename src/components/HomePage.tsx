// src/components/HomePage.tsx
import React, { useState } from "react"
import {
  Users,
  Stethoscope,
  Clock,
  Award,
  ArrowRight,
  Brain,
  Building2,
} from "lucide-react"

import logo2 from "../assets/3.svg"
import gpImg from "../assets/GP2.svg" // <-- ensure this exists or remove img usage
import PhoneChat from "./PhoneChat"
import WorkflowSection from "./WorkflowSection"
import who from "./ServicesPage"

interface HomePageProps {
  onNavigate: (page: string) => void
}

type Zone = {
  id: "gp" | "specialist" | "hospital"
  title: string
  subtitle: string
  icon: React.ReactNode
  gradient: string
  benefits: string
}

const zones: Zone[] = [
  {
    id: "gp",
    title: "PHC / GP Clinic",
    subtitle: "Smarter, calmer clinic ops",
    icon: <Stethoscope className="w-8 h-8" />,
    gradient: "from-blue-400 to-indigo-600",
    benefits:
      "Automate bookings, speed up notes, and track recovery without changing the way you work.",
  },
  {
    id: "specialist",
    title: "Specialist Access",
    subtitle: "Fast triage, clear handoffs",
    icon: <Brain className="w-8 h-8" />,
    gradient: "from-purple-400 to-pink-600",
    benefits:
      "Prioritise referrals, align with referring GPs, and push structured aftercare tasks back to primary care.",
  },
  {
    id: "hospital",
    title: "Hospital Integration",
    subtitle: "Seamless acute → follow-up",
    icon: <Building2 className="w-8 h-8" />,
    gradient: "from-red-400 to-orange-600",
    benefits:
      "Coordinate ER referrals, monitor inpatients, and manage outpatient follow-up with shared context.",
  },
]

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "Join Now", label: "Active Users" },
  { icon: <Stethoscope className="w-8 h-8" />, value: "Expanding", label: "Healthcare Providers" },
  { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Support Available" },
  { icon: <Award className="w-8 h-8" />, value: "99.9%", label: "Uptime Guarantee" },
]

// panel content
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
} as const

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showChoice, setShowChoice] = useState(false)
  const [openZone, setOpenZone] = useState<Zone | null>(null)

  return (
    <div className="bg-white">
      {/* HERO with semicircle gradient */}
      <section className="relative overflow-hidden">
        <div
          className="
            absolute left-1/2 -translate-x-1/2 top-0
            w-[130%] h-[520px]
            bg-gradient-to-b from-[#4F997FCC] to-white
            rounded-b-[100%]
            pointer-events-none
          "
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
          <div className="text-center mb-12">
            <img
              src={logo2}
              alt="AnyHealth"
              className="mx-auto h-72 w-auto drop-shadow-sm"
              style={{ objectFit: "contain" }}
            />
            <div className="mt-24">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Malaysia&apos;s 1st E-referral System
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Connecting patients, providers, and healthcare excellence
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative">
                <button
                  onClick={() => setShowChoice((prev) => !prev)}
                  className="px-8 py-4 bg-[#4F997F] hover:opacity-90 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  I am a...
                </button>
                {showChoice && (
                  <div className="absolute mt-2 left-1/2 -translate-x-1/2 bg-white border rounded-xl shadow-lg w-48 z-20">
                    <button
                      onClick={() => {
                        setShowChoice(false)
                        onNavigate("solutions") // Patient → PhoneChat demo
                      }}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-xl"
                    >
                      I’m a Patient
                    </button>
                    <button
                      onClick={() => {
                        setShowChoice(false)
                        onNavigate("who") // Provider zones below
                      }}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-b-xl"
                    >
                      I’m a Provider
                    </button>
                  </div>
                )}
              </div>

              <a
                href="https://calendly.com/anyhealth-sg/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold rounded-full transition-all duration-300"
              >
                Request Demo
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 pt-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#4F997F14] text-[#4F997F]">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
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
      <h2 className="text-4xl font-bold text-gray-900 text-center px-10 mb-8">
        Explore Our Products
      </h2>

      <section id="solutions" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Patients (Phone demo) */}
<div className="rounded-3xl bg-gradient-to-r from-slate-50 to-teal-50 ring-1 ring-emerald-200/60 shadow-xl p-8 md:p-10">
  <div className="text-center mb-8">
    <h3 className="text-3xl font-semibold">For Patients</h3>
    <p className="mt-1 text-gray-700 text-lg">
      Book appointments and manage your health seamlessly via WhatsApp.
    </p>
  </div>
  <PhoneChat />
</div>


          {/* Providers (Zones grid) — 3 in one row */}
          <div
            id="who"
            className="pt-10 mt-14 mb-28 rounded-3xl bg-white ring-1 ring-gray-200/70 shadow-xl p-6 md:p-10"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-semibold">For Providers</h3>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                Tools for GP clinics, specialists, and hospitals to streamline referrals and aftercare.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setOpenZone(zone)}
                  className="text-left group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-8
                             transform transition-all duration-500 hover:scale-105 hover:bg-gray-100 shadow-sm focus:outline-none"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${zone.gradient} opacity-0
                                group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${zone.gradient}
                                flex items-center justify-center text-white mb-6
                                group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                  >
                    {zone.icon}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{zone.title}</h4>
                    <p className="text-gray-700 mb-4">{zone.subtitle}</p>
                    <p className="text-gray-500 text-sm mb-6">{zone.benefits}</p>
                    <span className="inline-flex items-center text-emerald-700 font-semibold gap-2
                                     group-hover:gap-3 transition-all duration-300">
                      Explore Zone
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="items-center mt-10">
              <div className="items-center mt-12 text-center">
  <button
    onClick={() => onNavigate("providers")}
    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-2xl shadow-lg backdrop-blur-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
  >
    Explore All Services →
  </button>
</div>

            </div>
          </div>

          {/* Modal (panel) */}
          {openZone && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onKeyDown={(e) => e.key === "Escape" && setOpenZone(null)}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setOpenZone(null)}
              />

              {/* Panel */}
              <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b">
                  <button
                    className="shrink-0 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
                    onClick={() => setOpenZone(null)}
                    aria-label="Close"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-r ${openZone.gradient} text-white grid place-items-center shadow`}
                    >
                      <span className="sr-only">{openZone.title}</span>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">{openZone.title}</div>
                      <div className="text-xs text-gray-500">{openZone.subtitle}</div>
                    </div>
                  </div>
                  {/* no portal links in header */}
                </div>

                {/* Body */}
                <div className={`grid gap-0 ${openZone.id === "gp" ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                  {/* Media column — only for GP */}
                  {openZone.id === "gp" && (
                    <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r">
                      <div className="w-full rounded-2xl bg-white border flex items-center justify-center p-4">
                        <img
                          src={gpImg}
                          alt="GP"
                          className="w-full h-auto max-h-80 object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content area */}
                  <div className="p-5 md:p-6">
                    {openZone.id === "gp" && (
                      <>
                        <h5 className="text-lg font-semibold text-gray-900">
                          {contentById.gp.headline}
                        </h5>
                        <p className="mt-2 text-sm text-gray-600">{contentById.gp.blurb}</p>

                        <h6 className="mt-6 text-sm font-semibold text-gray-900">
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
                        
                        <h5 className="mt-3 text-lg font-semibold text-gray-900">
                          {contentById.specialist.headline}
                        </h5>
                        <p className="mt-2 text-sm text-gray-600">
                          {contentById.specialist.blurb}
                        </p>

                        <h6 className="mt-6 text-sm font-semibold text-gray-900">
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
                        
                        <h5 className="mt-3 text-lg font-semibold text-gray-900">
                          {contentById.hospital.headline}
                        </h5>
                        <p className="mt-2 text-sm text-gray-600">
                          {contentById.hospital.blurb}
                        </p>

                        <h6 className="mt-6 text-sm font-semibold text-gray-900">
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
                          className="px-4 py-2 rounded-full border text-gray-700 hover:bg-gray-50"
                        >
                          Close
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Malaysia&apos;s Healthcare Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our network of Clinics and Hospitals and empower your patients today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@anyhealth.asia"
              className="px-8 py-4 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="https://calendly.com/anyhealth-sg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold rounded-full transition-all duration-300"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
