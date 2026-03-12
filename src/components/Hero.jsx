import logo from '/brand assets/3.png'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0D1B4B 0%,#0D1B4B 55%,#2D5A3D 100%)' }}
    >
      <style>{`
        @keyframes floatOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-30px) scale(1.08); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-30px,40px) scale(1.05); }
          66% { transform: translate(25px,-15px) scale(0.97); }
        }
        @keyframes floatOrb3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,30px) scale(1.1); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinRingReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes dot1 {
          0%,100% { transform: translate(0,0); opacity:0.6; }
          50% { transform: translate(8px,-12px); opacity:1; }
        }
        @keyframes dot2 {
          0%,100% { transform: translate(0,0); opacity:0.4; }
          50% { transform: translate(-10px,8px); opacity:0.8; }
        }
        @keyframes dot3 {
          0%,100% { transform: translate(0,0); opacity:0.7; }
          50% { transform: translate(6px,10px); opacity:0.3; }
        }
        @keyframes logoFloat {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .hero-chip { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.1s; }
        .hero-logo { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both, logoFloat 5s ease-in-out 1s infinite; animation-delay: 0.25s, 1s; }
        .hero-h1 { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.35s; }
        .hero-p { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.5s; }
        .hero-btns { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.65s; }
        .hero-stats { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.8s; }
        .shimmer-text {
          background: linear-gradient(90deg, #5BAE8C 0%, #a8ffda 40%, #5BAE8C 60%, #4A9960 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute',top:'-8%',right:'-8%',width:'60vw',height:'60vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(91,174,140,0.22) 0%,transparent 65%)',animation:'floatOrb1 12s ease-in-out infinite' }} />
        <div style={{ position:'absolute',bottom:'-12%',left:'-8%',width:'50vw',height:'50vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(74,153,96,0.16) 0%,transparent 65%)',animation:'floatOrb2 15s ease-in-out infinite' }} />
        <div style={{ position:'absolute',top:'40%',left:'30%',width:'35vw',height:'35vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(13,27,75,0.4) 0%,rgba(91,174,140,0.08) 60%,transparent 80%)',animation:'floatOrb3 10s ease-in-out infinite' }} />

        {/* Floating dots */}
        {[
          { top:'15%',left:'12%',size:6,anim:'dot1',dur:'4s' },
          { top:'72%',left:'8%',size:4,anim:'dot2',dur:'5.5s' },
          { top:'30%',right:'10%',size:5,anim:'dot3',dur:'3.8s' },
          { top:'60%',right:'14%',size:3,anim:'dot1',dur:'6s' },
          { top:'85%',left:'40%',size:4,anim:'dot2',dur:'4.8s' },
          { top:'10%',left:'55%',size:3,anim:'dot3',dur:'5.2s' },
          { top:'50%',left:'3%',size:5,anim:'dot1',dur:'7s' },
          { top:'20%',right:'25%',size:4,anim:'dot2',dur:'4.2s' },
        ].map((d,i) => (
          <div key={i} style={{
            position:'absolute',
            top: d.top, left: d.left, right: d.right,
            width: d.size, height: d.size,
            borderRadius:'50%',
            background:'rgba(91,174,140,0.7)',
            animation:`${d.anim} ${d.dur} ease-in-out infinite`,
            animationDelay: `${i*0.4}s`,
          }} />
        ))}

        {/* Grid lines subtle */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity:0.04 }}>
          <defs>
            <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-10 text-center flex flex-col items-center">

        {/* Chip */}
        <span className="chip mb-6 hero-chip" style={{ background:'rgba(91,174,140,0.18)',color:'#5BAE8C' }}>
          WhatsApp-Native Platform
        </span>

        {/* Logo with ring animations */}
        <div className="relative hero-logo mb-6" style={{ width:100,height:100 }}>
          {/* Outer spinning dashed ring */}
          <div style={{
            position:'absolute', inset:-28,
            borderRadius:'50%',
            border:'1.5px dashed rgba(91,174,140,0.35)',
            animation:'spinRing 18s linear infinite',
          }} />
          {/* Inner spinning ring */}
          <div style={{
            position:'absolute', inset:-14,
            borderRadius:'50%',
            border:'1px solid rgba(91,174,140,0.2)',
            animation:'spinRingReverse 12s linear infinite',
          }}>
            {/* Ring dots */}
            {[0,72,144,216,288].map((deg,i) => (
              <div key={i} style={{
                position:'absolute',
                top:'50%', left:'50%',
                width:6, height:6,
                borderRadius:'50%',
                background: i===0 ? '#5BAE8C' : 'rgba(91,174,140,0.5)',
                transform:`rotate(${deg}deg) translateX(calc(50% + 7px)) translateY(-50%)`,
                boxShadow: i===0 ? '0 0 8px rgba(91,174,140,0.8)' : 'none',
              }} />
            ))}
          </div>
          {/* Pulse glow behind logo */}
          <div style={{
            position:'absolute', inset:-6,
            borderRadius:'50%',
            background:'radial-gradient(circle,rgba(91,174,140,0.35) 0%,transparent 70%)',
            animation:'ringPulse 3s ease-in-out infinite',
          }} />
          {/* Logo image */}
          <img
            src={logo}
            alt="AnyHealth"
            style={{ width:100, height:100, objectFit:'contain', position:'relative', zIndex:1, filter:'drop-shadow(0 8px 24px rgba(91,174,140,0.5))' }}
          />
        </div>

        {/* Headline */}
        <h1
          className="hero-h1 text-white font-poppins font-black leading-none mb-6"
          style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(2.2rem,4.5vw,4.8rem)',letterSpacing:'-0.03em',lineHeight:'1.0' }}
        >
          The Operating System<br />
          <span className="shimmer-text">Clinics & Emergency</span><br />
          Response Deserve.
        </h1>

        {/* Subtext */}
        <p
          className="hero-p mb-8 max-w-2xl"
          style={{ fontFamily:"'Inter',sans-serif",fontSize:'1.1rem',lineHeight:'1.7',color:'rgba(255,255,255,0.65)' }}
        >
          AnyHealth runs entirely on WhatsApp — no app downloads, no manual workflows. Automate bookings, cut no-shows by 15%, and dispatch ambulances in 30 seconds.
        </p>

        {/* CTAs */}
        <div className="hero-btns flex flex-wrap gap-4 justify-center">
          <a href="#contact" className="btn-primary">Start Your Free Month</a>
          <a
            href="https://calendly.com/anyhealth-sg/30min"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            Book a Demo
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats flex flex-wrap gap-10 mt-8 justify-center">
          {[
            { val: '15%', label: 'No-show reduction' },
            { val: '30s', label: 'Ambulance dispatch' },
            { val: '24/7', label: 'WhatsApp bot uptime' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:'2.2rem',fontWeight:900,color:'#fff',letterSpacing:'-0.02em' }}>{s.val}</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'rgba(255,255,255,0.5)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white text-xs" style={{ fontFamily:"'Inter',sans-serif" }}>Scroll</span>
        <div style={{ width:'1px',height:'36px',background:'linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)' }} />
      </div>
    </section>
  )
}
