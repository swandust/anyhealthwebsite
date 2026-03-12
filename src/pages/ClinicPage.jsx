import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import logo from '/brand assets/3.png'
import whatsappBot from '/brand assets/17.png'
import dashboard from '/brand assets/18.png'

export default function ClinicPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
    <Helmet>
      <title>Clinic Suite — 24/7 WhatsApp Booking, Reminders & Dashboard | AnyHealth</title>
      <meta name="description" content="AnyHealth's Clinic Suite puts your GP or TCM clinic on WhatsApp. Automate bookings, send appointment reminders, reduce no-shows by 15%, and manage patient records — all in one dashboard." />
      <link rel="canonical" href="https://anyhealth.asia/clinic" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://anyhealth.asia/clinic" />
      <meta property="og:title" content="Clinic Suite — 24/7 WhatsApp Booking & Automation | AnyHealth" />
      <meta property="og:description" content="Put your clinic on WhatsApp. Automate bookings, cut no-shows by 15%, and save 2+ hours of admin daily." />
      <meta property="og:image" content="https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Clinic Suite — 24/7 WhatsApp Booking & Automation | AnyHealth" />
      <meta name="twitter:description" content="Put your clinic on WhatsApp. Automate bookings, cut no-shows by 15%, and save 2+ hours of admin daily." />
    </Helmet>
    <div style={{ background: '#F0F5F2', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Floating nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', pointerEvents: 'none' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', pointerEvents: 'auto', background: 'rgba(13,27,75,0.85)', backdropFilter: 'blur(16px)', borderRadius: '9999px', padding: '0.5rem 1.2rem 0.5rem 0.7rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={logo} alt="AnyHealth" style={{ height: '28px' }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>AnyHealth</span>
        </Link>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', textDecoration: 'none', pointerEvents: 'auto', background: 'rgba(13,27,75,0.85)', backdropFilter: 'blur(16px)', borderRadius: '9999px', padding: '0.5rem 1.1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </Link>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '80px', background: 'linear-gradient(135deg,#0D1B4B 0%,#1a3a2a 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,174,140,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(74,153,96,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="reveal" style={{ display: 'inline-block', background: 'rgba(91,174,140,0.18)', color: '#5BAE8C', fontFamily: "'Poppins',sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '9999px', marginBottom: '1.5rem', border: '1px solid rgba(91,174,140,0.25)' }}>
              Clinic Suite
            </div>
            <h1 className="reveal" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem' }}>
              Your clinic on<br /><span style={{ color: '#5BAE8C' }}>WhatsApp.</span>
            </h1>
            <p className="reveal" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)', maxWidth: '480px', marginBottom: '2rem' }}>
              Make booking, reminders, referrals, and follow-ups effortless. The experience patients expect — with outcomes clinics love.
            </p>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {[
                { icon: '📉', text: 'Fewer no-shows — automated reminders & rescheduling keep your day on track.' },
                { icon: '⭐', text: 'Higher satisfaction — clear post-consult summaries build trust and adherence.' },
                { icon: '🔗', text: 'Keep patients in-network — digital e-referrals route to trusted specialists fast.' },
              ].map(b => (
                <div key={b.icon} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }}>{b.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.88rem', lineHeight: 1.6 }}>{b.text}</span>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://calendly.com/anyhealth-sg/30min" target="_blank" rel="noreferrer" className="btn-primary">Book a Demo</a>
              <Link to="/" style={{ border: '2px solid rgba(255,255,255,0.25)', color: '#fff', fontFamily: "'Poppins',sans-serif", fontWeight: 600, borderRadius: '9999px', padding: '0.8rem 2rem', textDecoration: 'none', fontSize: '0.88rem' }}>Back to Home</Link>
            </div>
          </div>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={whatsappBot} alt="AnyHealth WhatsApp Bot" style={{ maxWidth: '100%', width: '420px', borderRadius: '24px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }} />
          </div>
        </div>
      </section>

      {/* GP Dashboard section */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', order: 1 }}>
              <img src={dashboard} alt="AnyHealth GP Dashboard" style={{ maxWidth: '100%', width: '540px', borderRadius: '24px', boxShadow: '0 24px 64px rgba(13,27,75,0.12)' }} />
            </div>
            <div className="reveal" style={{ order: 2 }}>
              <span style={{ background: 'rgba(91,174,140,0.12)', color: '#4A9960', fontFamily: "'Poppins',sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.5rem' }}>The AnyHealth GP Dashboard</span>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 900, color: '#0D1B4B', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem' }}>
                One workspace.<br /><span style={{ color: '#5BAE8C' }}>Every workflow.</span>
              </h2>
              <p style={{ color: '#0D1B4B', opacity: 0.58, lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.92rem' }}>
                Designed with doctors, pharmacists, and clinic admins in mind. Bookings, consults, summaries, and referrals — all in one place.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { title: 'All-in-One Patient Mgmt', items: ['Manage bookings & consults', 'Generate summaries instantly', 'Track recovery with timeline'] },
                  { title: 'Admin Made Easy', items: ['One-time digital registration', 'Auto-referrals & follow-up texts', 'Google Calendar sync'] },
                  { title: 'Smarter Operations', items: ['Role-based access control', 'Unified schedule across doctors', 'Pharmacy integration'] },
                  { title: 'Pharmacy Integration', items: ['Fast drug dosage entry', 'Upload prescriptions via WhatsApp', 'Inventory tracking'] },
                ].map(m => (
                  <div key={m.title} style={{ padding: '1rem', borderRadius: '14px', background: '#F0F5F2' }}>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#0D1B4B', fontSize: '0.8rem', marginBottom: '0.6rem' }}>{m.title}</div>
                    {m.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#5BAE8C', fontSize: '0.7rem', marginTop: '3px', flexShrink: 0 }}>✓</span>
                        <span style={{ color: '#0D1B4B', opacity: 0.55, fontSize: '0.75rem', lineHeight: 1.45 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Confidence */}
      <section style={{ padding: '5rem 2rem', background: '#F0F5F2' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ background: 'rgba(91,174,140,0.12)', color: '#4A9960', fontFamily: "'Poppins',sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.25rem' }}>Operational Confidence</span>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900, color: '#0D1B4B', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Built for clinical rigor,<br /><span style={{ color: '#5BAE8C' }}>day-one reliability.</span>
            </h2>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🔐', title: 'Data Security & Privacy', desc: 'Enterprise-grade encryption and role-based access control across all data.' },
              { icon: '🕐', title: '24/7 Support', desc: 'Round-the-clock technical assistance so your clinic never goes dark.' },
              { icon: '🌏', title: 'Multi-language', desc: 'Accessible for diverse patient communities across Southeast Asia.' },
              { icon: '✅', title: 'Compliance-Ready', desc: 'Aligned with international healthcare data protection standards.' },
            ].map(p => (
              <div key={p.title} style={{ padding: '1.75rem', borderRadius: '20px', background: '#fff', boxShadow: '0 6px 24px rgba(13,27,75,0.07)', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>{p.icon}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#0D1B4B', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{p.title}</div>
                <div style={{ color: '#0D1B4B', opacity: 0.52, fontSize: '0.8rem', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get as a Provider */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <span style={{ background: 'rgba(91,174,140,0.12)', color: '#4A9960', fontFamily: "'Poppins',sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.25rem' }}>What You Get as a Provider</span>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900, color: '#0D1B4B', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: '520px' }}>
              More than software —<br /><span style={{ color: '#5BAE8C' }}>a network that grows with you.</span>
            </h2>
            <p style={{ color: '#0D1B4B', opacity: 0.55, fontSize: '0.92rem', lineHeight: 1.7, maxWidth: '500px', marginTop: '1rem' }}>
              When you subscribe to AnyHealth, you're joining a network that boosts visibility, simplifies operations, and helps you deliver outstanding care.
            </p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
            {[
              { icon: '🔍', title: 'Be Discoverable', desc: 'Get listed in our specialist & hospital panels so patients can find and book your services easily.' },
              { icon: '📅', title: 'Smart Scheduling', desc: 'Reduce admin load with automated booking, reminders, and referral workflows.' },
              { icon: '📄', title: 'Digital Post-Consult', desc: 'Provide patients with professional summaries and e-prescriptions instantly after visits.' },
              { icon: '🤝', title: 'Referral Network', desc: 'Tap into our referral engine to connect with trusted GPs and specialists in real time.' },
              { icon: '🛡️', title: 'Security & Compliance', desc: 'Encrypted databases, role-based logins, and privacy-first infrastructure built for healthcare.' },
              { icon: '⭐', title: 'Reputation Boost', desc: 'Position your clinic as forward-thinking and tech-enabled — building patient trust and loyalty.' },
            ].map((b, i) => (
              <div key={b.title} className="feature-card" style={{ padding: '1.5rem', borderRadius: '20px', background: '#F0F5F2', boxShadow: '0 4px 16px rgba(13,27,75,0.05)', border: '1px solid rgba(13,27,75,0.05)' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{b.icon}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#0D1B4B', fontSize: '0.92rem', marginBottom: '0.4rem' }}>{b.title}</div>
                <div style={{ color: '#0D1B4B', opacity: 0.52, fontSize: '0.82rem', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg,#0D1B4B,#2D5A3D)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { val: '82%', label: 'WhatsApp Response Rate' },
            { val: '~70', label: 'Notifications/Day per Clinic' },
            { val: '2 hrs', label: 'Admin Time Saved Daily' },
            { val: '0', label: 'App Downloads Required' },
          ].map(s => (
            <div key={s.label} className="reveal">
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '2.8rem', fontWeight: 900, color: '#5BAE8C', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.5rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: '#F0F5F2', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: '580px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#0D1B4B', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
            Ready to automate your clinic?
          </h2>
          <p style={{ color: '#0D1B4B', opacity: 0.52, lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
            Join clinics across Malaysia already saving 2+ hours of admin work every day.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://calendly.com/anyhealth-sg/30min" target="_blank" rel="noreferrer" className="btn-primary">Book a Demo</a>
            <Link to="/" style={{ border: '2px solid rgba(13,27,75,0.2)', color: '#0D1B4B', fontFamily: "'Poppins',sans-serif", fontWeight: 600, borderRadius: '9999px', padding: '0.8rem 2rem', textDecoration: 'none', fontSize: '0.88rem' }}>Back to Home</Link>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}
