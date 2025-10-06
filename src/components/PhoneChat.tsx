import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { id: number; from: "bot" | "you"; text: string };
type Step =
  | "start"
  | "askBook"
  | "askSymptoms"
  | "chooseDate"
  | "confirm"
  | "postConsult"
  | "sendReferral"
  | "done";

const SYMPTOMS = ["Chest pain"];
const DATES = ["Today 3:00 PM"];
const ACTION_BAR_PX = 72; // Action bar height

export default function PhoneChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("start");
  const [typing, setTyping] = useState(false);
  const [choice, setChoice] = useState<{ symptoms: string[]; slot?: string }>({ symptoms: [] });

  const idRef = useRef(0);
  const timeoutsRef = useRef<number[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  // ---------- helpers ----------
  const setT = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
    setTyping(false);
  };

  const pushBot = (text: string, delay = 450) => {
    setTyping(true);
    setT(() => {
      idRef.current += 1;
      setMessages((m) => [...m, { id: idRef.current, from: "bot", text }]);
      setTyping(false);
    }, delay);
  };

  const pushYou = (text: string) => {
    idRef.current += 1;
    setMessages((m) => [...m, { id: idRef.current, from: "you", text }]);
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, step]);

  useEffect(() => () => clearTimeouts(), []);

  // start chat from action bar "Try Now"
  const startChat = () => {
    pushBot("AnyHealth Bot");
    pushBot("Welcome to AnyHealth Bot! Would you like to book an appointment at a partner clinic?", 600);
    setT(() => setStep("askBook"), 1100);
  };

  const reset = () => {
    clearTimeouts();
    setMessages([]);
    setChoice({ symptoms: [] });
    setStep("start");
  };

  // switch bg after post-consult
  const chatBg = step === "postConsult" ? "bg-gradient-to-b from-purple-50 to-white" : "bg-gray-50";

  // ---------- action area ----------
  const ActionArea = useMemo(() => {
    if (step === "start") {
      return (
        <div className="w-full flex justify-center">
          <button
            onClick={startChat}
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Try Now
          </button>
        </div>
      );
    }

    if (step === "askBook") {
      return (
        <div className="flex gap-2 justify-end w-full">
          <button
            onClick={() => {
              clearTimeouts();
              pushYou("Yes, book an appointment");
              pushBot("Please describe your symptoms (choose one or more).");
              setStep("askSymptoms");
            }}
            className="px-3 py-2 rounded-full bg-blue-600 text-white"
          >
            Yes
          </button>
          <button
            onClick={() => {
              clearTimeouts();
              pushYou("No, thanks");
              pushBot("Okay! You can browse information or return later.");
              setStep("done");
            }}
            className="px-3 py-2 rounded-full bg-gray-200"
          >
            No
          </button>
        </div>
      );
    }

    if (step === "askSymptoms") {
      return (
        <div className="flex flex-wrap gap-2 justify-end w-full">
          {SYMPTOMS.map((s) => (
            <button
              key={s}
              onClick={() => {
                clearTimeouts();
                pushYou(s);
                setChoice({ symptoms: [s] });
                pushBot("Dr. Rong is available — please select a time.", 500);
                setStep("chooseDate");
              }}
              className="px-3 py-2 rounded-full bg-gray-100 border"
            >
              {s}
            </button>
          ))}
        </div>
      );
    }

    if (step === "chooseDate") {
      return (
        <div className="flex flex-wrap gap-2 justify-end w-full">
          {DATES.map((d) => (
            <button
              key={d}
              onClick={() => {
                clearTimeouts();
                pushYou(d);
                setChoice((c) => ({ ...c, slot: d }));
                pushBot(`Confirm booking for ${d}?`, 450);
                setStep("confirm");
              }}
              className="px-3 py-2 rounded-full bg-gray-100 border"
            >
              {d}
            </button>
          ))}
        </div>
      );
    }

    if (step === "confirm") {
      return (
        <div className="flex gap-2 justify-end w-full">
          <button
            onClick={() => {
              clearTimeouts();
              pushYou("Confirm ✅");
              const code = Math.random().toString(36).slice(2, 8).toUpperCase();
              pushBot(`🎉 Booked! Ref: ${code}`, 350);
              pushBot(`Time: ${choice.slot}\nDoctor: Dr. Rong\nLocation: Nearest partner clinic`, 550);
              setStep("postConsult");
            }}
            className="px-3 py-2 rounded-full bg-green-600 text-white"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              clearTimeouts();
              pushYou("Change");
              pushBot("Sure—pick another time ⏰", 350);
              setStep("chooseDate");
            }}
            className="px-3 py-2 rounded-full bg-gray-200"
          >
            Change
          </button>
        </div>
      );
    }

    if (step === "postConsult") {
      return (
        <div className="flex gap-2 justify-end w-full">
          <button
            onClick={() => {
              clearTimeouts();
              pushYou("View post-consult");
              pushBot(
                [
                  "📝 Post-consult summary",
                  "Doctor: rongmah1605 • 2025-09-11",
                  "Dx: Hypertension (suspected)",
                  "Fastest ETA: Hospital Pulau Pinang (≈0.01 days)",
                ].join("\n"),
                450
              );
              setStep("sendReferral");
            }}
            className="px-3 py-2 rounded-full bg-purple-600 text-white"
          >
            Post consult
          </button>
        </div>
      );
    }

    if (step === "sendReferral") {
      return (
        <div className="flex gap-2 justify-end w-full">
          <button
            onClick={() => {
              clearTimeouts();
              pushYou("Confirm Referral");
              pushBot("📤 Your booking has been sent to the specialist.", 450);
              pushBot("✅ You’ll receive a confirmation shortly.", 900);
              setStep("done");
            }}
            className="px-3 py-2 rounded-full bg-blue-600 text-white"
          >
            Confirm Referral
          </button>
          <button onClick={reset} className="px-3 py-2 rounded-full bg-gray-200">
            Start over
          </button>
        </div>
      );
    }

    if (step === "done") {
      return (
        <div className="w-full flex justify-center">
          <button onClick={reset} className="px-4 py-2 rounded-full bg-blue-600 text-white">
            Start over
          </button>
        </div>
      );
    }

    return null;
  }, [step, choice.slot]);

  return (
    <div className="w-full grid md:grid-cols-2 gap-8 mt-8">
      {/* Left: phone mockup */}
      <div className="mx-auto">
        <div className="w-[280px] h-[560px] rounded-[26px] border bg-white shadow-xl relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/80 rounded-3xl" />

          {/* Contact header */}
          <div className="absolute top-5 left-0 right-0 h-11 px-3 flex items-center justify-between border-b bg-white/90 backdrop-blur z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white grid place-items-center text-xs font-semibold">
                AH
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">AnyHealth Bot</div>
                <div className="text-[11px] text-gray-500">online</div>
              </div>
            </div>
            <div className="text-gray-400 text-lg">⋯</div>
          </div>

          {/* Chat area */}
          <div
            className={`absolute inset-0 pt-[72px] px-2.5 overflow-y-auto ${chatBg}`}
            style={{
              paddingBottom: `${ACTION_BAR_PX + 16}px`,
              overscrollBehavior: "contain", // prevent page scroll bleed
              WebkitOverflowScrolling: "touch", // momentum scroll on iOS
            }}
          >
            {messages.map((m) => (
              <div key={m.id} className={`my-1.5 flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] whitespace-pre-wrap px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                    m.from === "you"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white border rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="my-1.5 flex justify-start">
                <div className="px-3 py-2 rounded-2xl bg-white border text-[13px]">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  </span>
                </div>
              </div>
            )}

            {/* spacer so last bubble never hides behind action bar */}
            <div style={{ height: `${ACTION_BAR_PX}px` }} />
            <div ref={endRef} className="h-1" />
          </div>

          {/* Actions bar */}
          <div
            className="absolute bottom-0 left-0 right-0 border-t bg-white/90 backdrop-blur"
            style={{ height: `${ACTION_BAR_PX}px` }}
          >
            <div className="h-full flex items-center px-2.5">{ActionArea}</div>
          </div>
        </div>
      </div>

      {/* Right: copy */}
      <div className="flex flex-col justify-center">
        <div className="border rounded-3xl p-8 bg-gray-50 shadow-lg transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-semibold">WhatsApp-Based Booking & Referral Flow</h3>
          <ul className="mt-4 text-gray-700 list-disc pl-5 space-y-2 text-left">
            <li>Tap quick replies instead of filling forms.</li>
            <li>AI suggests earliest slots based on urgency + distance.</li>
            <li>Clinics accept in their dashboard; patients get confirmations.</li>
          </ul>
          <div className="flex justify-center mt-6">
            <a
              href="#"
              className="px-8 py-4 bg-[#4F997F] w-[60%] text-center hover:opacity-90 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book a GP Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
