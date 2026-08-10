/**
 * Home-page hero: the headline morphs through healthcare verticals while the
 * phone mockup replays a WhatsApp conversation tailored to that vertical -  * showing how one AnyHealth bot morphs for dental, GP, physio, chiro,
 * aesthetics, TCM, hospitals and non-emergency ambulance fleets.
 */

interface Vertical {
  word: string;
  botName: string;
  chat: Array<{ from: 'patient' | 'bot'; text: string }>;
}

const VERTICALS: Vertical[] = [
  {
    word: 'dental clinic',
    botName: 'BrightSmile Dental (AnyHealth)',
    chat: [
      { from: 'patient', text: 'Hi! Can I book a scaling & polishing this week? 🦷' },
      { from: 'bot', text: 'Of course! Dr Tan has Thu 2:30 PM or Sat 10 AM at our Bukit Timah branch - which works?' },
      { from: 'patient', text: 'Sat 10 AM please' },
      { from: 'bot', text: 'Booked ✅ Sat 10 AM with Dr Tan. I’ll remind you a day before - reply anytime to reschedule.' },
    ],
  },
  {
    word: 'GP practice',
    botName: 'One Care Clinic (AnyHealth)',
    chat: [
      { from: 'patient', text: 'I want to book a doctor, I have a fever 🤒' },
      { from: 'bot', text: 'Sorry to hear that! The nearest clinic to you has a slot today 5:15 PM. Prefer a specific doctor?' },
      { from: 'patient', text: 'Any doctor is fine' },
      { from: 'bot', text: 'Confirmed ✅ Today 5:15 PM. Bring your IC - your queue number will be sent before you arrive.' },
    ],
  },
  {
    word: 'physio studio',
    botName: 'MoveWell Physio (AnyHealth)',
    chat: [
      { from: 'patient', text: 'Knee still stiff after last session. Can I move my Friday slot earlier?' },
      { from: 'bot', text: 'Done - moved to Thu 4 PM with Sarah. Meanwhile, here’s your home exercise plan 📋' },
      { from: 'patient', text: 'Thanks! 🙏' },
      { from: 'bot', text: 'Anytime! I’ll check in after the session to track your recovery progress.' },
    ],
  },
  {
    word: 'chiro practice',
    botName: 'AlignCare Chiro (AnyHealth)',
    chat: [
      { from: 'patient', text: 'Lower back pain is back… any openings tomorrow?' },
      { from: 'bot', text: 'Dr Lim has 11 AM or 6:30 PM tomorrow. You’re due for your 6-visit review too - shall I bundle it?' },
      { from: 'patient', text: '6:30 PM and yes please' },
      { from: 'bot', text: 'Locked in ✅ Adjustment + progress review, tomorrow 6:30 PM.' },
    ],
  },
  {
    word: 'aesthetic clinic',
    botName: 'Lumière Aesthetics (AnyHealth)',
    chat: [
      { from: 'patient', text: 'Hi, how much is the laser facial promo I saw? ✨' },
      { from: 'bot', text: 'Our June laser facial is $188 (u.p. $280). Dr Chua has Fri 3 PM - want me to hold it?' },
      { from: 'patient', text: 'Yes hold it for me!' },
      { from: 'bot', text: 'Held ✅ Fri 3 PM. Pre-care tips coming up - avoid retinol 48h before your session 💆‍♀️' },
    ],
  },
  {
    word: 'TCM chain',
    botName: 'Heritage TCM (AnyHealth)',
    chat: [
      { from: 'patient', text: '想预约推拿, this Saturday can?' },
      { from: 'bot', text: 'Can! Physician Goh - Sat 11 AM at the outlet nearest you (Jurong East). Confirm?' },
      { from: 'patient', text: 'Confirm 👍' },
      { from: 'bot', text: '预约成功 ✅ Sat 11 AM. Your herbal refill is also ready for pickup at the same visit.' },
    ],
  },
  {
    word: 'hospital group',
    botName: 'AnyHealth Hospital Assistant',
    chat: [
      { from: 'bot', text: 'Hi Mr Beng! Cardiology consult today 2 PM. Fewer patients now - arrive 1:30 PM for a shorter wait 🕐' },
      { from: 'patient', text: 'On my way' },
      { from: 'bot', text: 'Parking nearest cardiology: Zone C, B2. Take lift #1 to level 3 - your queue no. is 351.' },
      { from: 'bot', text: 'Doctor is ready - please enter consultation room 5. Pharmacy & payment will be handled online after 💳' },
    ],
  },
  {
    word: 'ambulance fleet',
    botName: 'MediRescue Ops (AnyHealth)',
    chat: [
      { from: 'patient', text: 'Need a wheelchair transfer: Serdang Hospital → home, discharge Friday 10 AM' },
      { from: 'bot', text: 'Scheduled ✅ Crew Alpha assigned. Pickup Fri 10 AM, ward 7A. Live tracking link will be sent to your family.' },
      { from: 'patient', text: 'Can the crew bring oxygen support?' },
      { from: 'bot', text: 'Yes - O₂ flagged on the case card. The crew app has your full transfer brief 🚑' },
    ],
  },
];

const SWAP_MS = 5200;

export function initHero(): void {
  const wordEl = document.getElementById('morph-word');
  const chatEl = document.getElementById('hero-chat');
  const botNameEl = document.getElementById('hero-bot-name');
  if (!wordEl || !chatEl || !botNameEl) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let idx = 0;
  let bubbleTimers: number[] = [];

  const now = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  function renderChat(v: Vertical): void {
    bubbleTimers.forEach(clearTimeout);
    bubbleTimers = [];
    chatEl!.innerHTML = '';
    botNameEl!.textContent = v.botName;

    v.chat.forEach((msg, i) => {
      const show = () => {
        const b = document.createElement('div');
        b.className = `bubble ${msg.from === 'bot' ? 'bubble-in' : 'bubble-out'}`;
        b.innerHTML = `${msg.text}<span class="bubble-time">${now()} ${msg.from === 'patient' ? '✓✓' : ''}</span>`;
        chatEl!.appendChild(b);
        chatEl!.scrollTop = chatEl!.scrollHeight;
      };
      if (reduced) show();
      else bubbleTimers.push(window.setTimeout(show, 350 + i * 1050));
    });
  }

  function swap(): void {
    idx = (idx + 1) % VERTICALS.length;
    const v = VERTICALS[idx];
    wordEl!.classList.remove('is-swapping');
    // force reflow so the swap animation replays
    void (wordEl as HTMLElement).offsetWidth;
    wordEl!.textContent = v.word;
    wordEl!.classList.add('is-swapping');
    renderChat(v);
  }

  renderChat(VERTICALS[0]);
  if (!reduced) setInterval(swap, SWAP_MS);
}
