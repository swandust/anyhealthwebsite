import {
  MessageSquare,
  FileDigit,
  Activity,
} from "lucide-react";
import device from "../assets/device.svg";


export default function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + copy */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold ring-1 ring-emerald-200">
              AnyHealth Virtual Hospital
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              Malaysia’s first nationwide e-referral system
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              AnyHealth links <strong>patients</strong>, <strong>GPs</strong>, and{" "}
              <strong>specialists</strong> on a secure WhatsApp-based platform—replacing
              paper referrals to cut waits, prevent resource mismatches, and unlock
              new revenue for private clinics. The result: faster access and better
              outcomes across public & private sectors.
            </p>

            {/* Key points */}
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-700" />
                </span>
                WhatsApp booking replaces manual calls & paper letters
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <FileDigit className="h-3.5 w-3.5 text-emerald-700" />
                </span>
                Digital e-referral with complete context for specialists
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <Activity className="h-3.5 w-3.5 text-emerald-700" />
                </span>
                Optimised queues & aftercare loop to reduce rework
              </li>
            </ul>
          </div>
          {/* Visual flow (no external images) */}
          <div className="relative">
            <div>
              <img
                src={device}
                alt="Device"
                className="w-full max-w-l mx-auto"
              />
            </div>

            {/* Shadow “card floating” effect */}
            <div className="absolute inset-0 -z-10 translate-y-4 blur-xl opacity-30 pointer-events-none">
              <div className="mx-auto max-w-3xl h-24 rounded-full bg-emerald-300/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
