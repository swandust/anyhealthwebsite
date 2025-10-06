// src/components/PricingPlans.tsx
import { CheckCircle, Sparkles } from "lucide-react";

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  highlight?: boolean;
  ctaLabel: string;
  ctaHref?: string;
  featurelabel?: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Early Bird Exclusive",
    subtitle: "Exlcusive Price until Mar 2026)",
    price: "RM250/mo",
    badge: "Limited Time",
    highlight: true,
    ctaLabel: "Get Early Bird",
    ctaHref: "mailto:contact@anyhealth.asia",
    featurelabel: "Base Features",
    features: [
      "WhatsApp Clinic platform",
      "GP dashboard + Google Calendar",
      "Post-consult report + digital e-referral",
      "Pharmacy integration",
      "1-year discount for the following year",
    ],
  },
  {
    name: "Silver Member",
    subtitle: "Core growth features for clinics",
    price: "RM500/mo",
    ctaLabel: "Choose Silver",
    ctaHref: "mailto:contact@anyhealth.asia",
    featurelabel: "Base Features + Triage System",
    features: [
      "WhatsApp Clinic platform",
      "GP dashboard + Google Calendar",
      "Post-consult report + digital e-referral",
      "Pharmacy integration",
      "Specialist triage system",
      
    
    ],
  },
  {
    name: "Gold Member",
    subtitle: "Scale operations with billing & inventory",
    price: "RM800/mo",
    ctaLabel: "Choose Gold",
    ctaHref: "mailto:contact@anyhealth.asia",
    featurelabel: "Comprehensive All-in-One Solution",
    features: [
      "WhatsApp Clinic platform",
      "GP dashboard + Google Calendar",
      "Post-consult report + digital e-referral",
      "Pharmacy integration & Specialist triage system",
      "Billing & inventory management",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section className="py-16 bg-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
            <Sparkles className="w-4 h-4" />
            Pricing plans for clinics
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
            Simple, transparent, built for growth
          </h2>
          <p className="mt-3 text-white/70">
            Start free with Early Bird, or pick a plan that matches your clinic’s scale.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "relative rounded-2xl p-6 backdrop-blur",
                plan.highlight
                  ? "bg-gradient-to-b from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 shadow-xl"
                  : "bg-white/5 border border-white/10",
              ].join(" ")}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              {/* Header */}
              <div>
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-white/70">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mt-6">
                {plan.originalPrice && (
                  <div className="text-sm text-white/50 line-through">{plan.originalPrice}</div>
                )}
                <div className="text-3xl font-extrabold text-white">{plan.price}</div>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-2">
             <div className = "text-white"> {plan.featurelabel} </div>

                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-white/85">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                {plan.ctaHref ? (
                  <a
                    href={plan.ctaHref}
                    target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                    rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={[
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition",
                      plan.highlight
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-white/10 text-white hover:bg-white/15",
                    ].join(" ")}
                  >
                    {plan.ctaLabel}
                  </a>
                ) : (
                  <button
                    className={[
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition",
                      plan.highlight
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-white/10 text-white hover:bg-white/15",
                    ].join(" ")}
                  >
                    {plan.ctaLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-6 text-center text-xs text-white/60">
          Early Bird: free until Mar 2026. Discounted subscription applies for one (1) year after the free period.
        </p>
      </div>
    </section>
  );
}
