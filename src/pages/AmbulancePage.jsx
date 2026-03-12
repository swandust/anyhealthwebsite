import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import logo from '/brand assets/3.png'
import crewApp from '/brand assets/19.png'
import whatsappBooking from '/brand assets/20.png'
import ambDashboard from '/brand assets/21.png'

export default function AmbulancePage() {
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
      <title>MediRescue — 30-Second Ambulance Dispatch with Live GPS Tracking | AnyHealth</title>
      <meta name="description" content="MediRescue dispatches ambulances in under 30 seconds. Patients book via WhatsApp, crews get the job on a mobile app with live GPS routing, and admins monitor every trip in real time." />
      <link rel="canonical" href="https://anyhealth.asia/ambulance" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://anyhealth.asia/ambulance" />
      <meta property="og:title" content="MediRescue — 30-Second Ambulance Dispatch with Live GPS | AnyHealth" />
      <meta property="og:description" content="Full-stack ambulance system: WhatsApp booking, crew mobile app, live GPS, and real-time ETA monitoring." />
      <meta property="og:image" content="https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="MediRescue — 30-Second Ambulance Dispatch | AnyHealth" />
      <meta name="twitter:description" content="Full-stack ambulance system: WhatsApp booking, crew mobile app, live GPS, and real-time ETA monitoring." />
    </Helmet>
    <div style={{ background:'#0a0a0a', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>
      {/* Mini nav */}
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,background:'rgba(10,10,10,0.95)',backdropFilter:'blur(14px)',padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/" style={{ display:'flex',alignItems:'center',gap:'10px',textDecoration:'none' }}>
          <img src={logo} alt="AnyHealth" style={{ height:'36px' }} />
          <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'1rem' }}>MediRescue</span>
        </Link>
        <Link to="/" style={{ display:'inline-flex',alignItems:'center',gap:'6px',color:'rgba(255,255,255,0.55)',fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',textDecoration:'none',transition:'color 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='#FF6B6B'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Home
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop:'120px',paddingBottom:'80px',background:'linear-gradient(135deg,#1a0505 0%,#5a0d0d 60%,#1a0505 100%)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'-20%',right:'-10%',width:'50vw',height:'50vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(229,62,62,0.12) 0%,transparent 70%)',pointerEvents:'none' }} />
        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 2rem' }}>
          <div className="reveal" style={{ display:'inline-block',background:'rgba(220,60,60,0.2)',color:'#FF6B6B',fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.35rem 0.9rem',borderRadius:'9999px',marginBottom:'1.5rem' }}>
            MediRescue
          </div>
          <h1 className="reveal" style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(2.5rem,6vw,5rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:'1.5rem' }}>
            Ambulance Dispatch<br /><span style={{ color:'#FF6B6B' }}>in 30 Seconds.</span>
          </h1>
          <p className="reveal" style={{ fontSize:'1.1rem',lineHeight:1.75,color:'rgba(255,255,255,0.6)',maxWidth:'560px',marginBottom:'2.5rem' }}>
            MediRescue is a full-stack ambulance system with a crew mobile app, live GPS tracking, WhatsApp booking for patients, and an admin dashboard with real-time ETA monitoring.
          </p>
          <div className="reveal" style={{ display:'flex',gap:'1rem',flexWrap:'wrap' }}>
            <a href="https://calendly.com/anyhealth-sg/30min" target="_blank" rel="noreferrer" className="btn-primary" style={{ background:'#E53E3E',boxShadow:'0 4px 18px rgba(229,62,62,0.4)' }}>Book a Demo</a>
            <Link to="/#contact" style={{ border:'2px solid rgba(255,255,255,0.25)',color:'#fff',fontFamily:"'Poppins',sans-serif",fontWeight:600,borderRadius:'9999px',padding:'0.8rem 2.1rem',display:'inline-block',textDecoration:'none',transition:'border-color 0.25s,background 0.25s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#FF6B6B';e.currentTarget.style.background='rgba(229,62,62,0.1)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.25)';e.currentTarget.style.background='transparent'}}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Crew App Section */}
      <section style={{ padding:'6rem 2rem',background:'#111' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'4rem',alignItems:'center' }}>
            <div className="reveal">
              <span style={{ background:'rgba(229,62,62,0.15)',color:'#FF6B6B',fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.35rem 0.9rem',borderRadius:'9999px',display:'inline-block',marginBottom:'1.5rem' }}>Crew Mobile App</span>
              <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.025em',lineHeight:1.1,marginBottom:'1.25rem' }}>
                Every crew member.<br /><span style={{ color:'#FF6B6B' }}>Always informed.</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.55)',lineHeight:1.75,marginBottom:'2rem',fontSize:'0.95rem' }}>
                The MediRescue crew app gives paramedics everything they need in the field — from route information and departure ETAs to one-tap navigation and live case status updates.
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
                {[
                  { icon:'🗺️', title:'Route & ETA', desc:'Real-time departure, completing, and returning ETAs shown clearly on every case.' },
                  { icon:'📍', title:'Navigate to Pickup/Drop-off', desc:'One-tap navigation directly to the patient and the destination hospital.' },
                  { icon:'📞', title:'WhatsApp & Call', desc:'Direct comms with patients and hospitals without leaving the app.' },
                  { icon:'✅', title:'Status Updates', desc:'Mark as Picked Up, Delivered, or Cancel — keeping dispatch informed instantly.' },
                ].map(f => (
                  <div key={f.title} style={{ display:'flex',gap:'1rem',padding:'1rem',borderRadius:'16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontSize:'1.4rem',flexShrink:0 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'0.9rem',marginBottom:'0.2rem' }}>{f.title}</div>
                      <div style={{ color:'rgba(255,255,255,0.45)',fontSize:'0.82rem',lineHeight:1.5 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ display:'flex',justifyContent:'center' }}>
              <img src={crewApp} alt="MediRescue Crew App" style={{ maxWidth:'100%',width:'480px',borderRadius:'24px',boxShadow:'0 24px 64px rgba(229,62,62,0.15)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Patient WhatsApp Booking */}
      <section style={{ padding:'6rem 2rem',background:'#0d0d0d' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'4rem',alignItems:'center' }}>
            <div className="reveal" style={{ display:'flex',justifyContent:'center' }}>
              <img src={whatsappBooking} alt="Patient WhatsApp Ambulance Booking" style={{ maxWidth:'100%',width:'480px',borderRadius:'24px',boxShadow:'0 24px 64px rgba(0,0,0,0.5)' }} />
            </div>
            <div className="reveal">
              <span style={{ background:'rgba(229,62,62,0.15)',color:'#FF6B6B',fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.35rem 0.9rem',borderRadius:'9999px',display:'inline-block',marginBottom:'1.5rem' }}>Patient Booking Flow</span>
              <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.025em',lineHeight:1.1,marginBottom:'1.25rem' }}>
                Book an ambulance<br /><span style={{ color:'#FF6B6B' }}>via WhatsApp.</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.55)',lineHeight:1.75,marginBottom:'2rem',fontSize:'0.95rem' }}>
                Patients in distress don't need to download anything. They message AnyHealth on WhatsApp, share their location, select the transport type, and an ambulance is dispatched.
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:'0.75rem' }}>
                {[
                  'Patient messages "Emergency Service" on WhatsApp',
                  'Bot collects patient condition and location automatically',
                  'Patient shares GPS location via WhatsApp share button',
                  'Transport type selected: Home→Hospital, Hosp→Hosp, etc.',
                  'Case dispatched to nearest available ambulance crew',
                ].map((step, i) => (
                  <div key={i} style={{ display:'flex',gap:'1rem',alignItems:'flex-start' }}>
                    <div style={{ width:'28px',height:'28px',borderRadius:'50%',background:'rgba(229,62,62,0.2)',border:'1px solid rgba(229,62,62,0.4)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px' }}>
                      <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#FF6B6B',fontSize:'0.78rem' }}>{i+1}</span>
                    </div>
                    <span style={{ color:'rgba(255,255,255,0.65)',fontSize:'0.88rem',lineHeight:1.6,paddingTop:'4px' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Dashboard */}
      <section style={{ padding:'6rem 2rem',background:'#111' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center',marginBottom:'3rem' }}>
            <span style={{ background:'rgba(229,62,62,0.15)',color:'#FF6B6B',fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.35rem 0.9rem',borderRadius:'9999px',display:'inline-block',marginBottom:'1.5rem' }}>Admin Dashboard</span>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.025em',lineHeight:1.1,marginBottom:'1rem' }}>
              Live tracking &amp; ETA.<br /><span style={{ color:'#FF6B6B' }}>For every case.</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.5)',maxWidth:'520px',margin:'0 auto',fontSize:'0.95rem',lineHeight:1.7 }}>
              The admin dashboard shows every active case on a live map with route details, ETA breakdowns, patient info, and payment status — all in one screen.
            </p>
          </div>
          <div className="reveal" style={{ borderRadius:'28px',overflow:'hidden',boxShadow:'0 24px 64px rgba(229,62,62,0.12)' }}>
            <img src={ambDashboard} alt="MediRescue Admin Dashboard" style={{ width:'100%',display:'block' }} />
          </div>
          <div className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1.5rem',marginTop:'3rem' }}>
            {[
              { icon:'🗺️', label:'Live Map View', desc:'Track all active ambulances on a real-time map' },
              { icon:'⏱️', label:'ETA Breakdown', desc:'Departure, destination & return ETAs per case' },
              { icon:'💳', label:'Payment Status', desc:'Track received, pending, and medic-only payments' },
              { icon:'📋', label:'Case Notes', desc:'Add clinical notes and case updates in real-time' },
            ].map(f => (
              <div key={f.label} style={{ padding:'1.5rem',borderRadius:'20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center' }}>
                <div style={{ fontSize:'2rem',marginBottom:'0.75rem' }}>{f.icon}</div>
                <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'0.9rem',marginBottom:'0.3rem' }}>{f.label}</div>
                <div style={{ color:'rgba(255,255,255,0.4)',fontSize:'0.8rem',lineHeight:1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ padding:'4rem 2rem',background:'linear-gradient(135deg,#5a0d0d,#1a0505)' }}>
        <div style={{ maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'2rem',textAlign:'center' }}>
          {[
            { val:'30s', label:'Dispatch Time' },
            { val:'0', label:'App Downloads for Patients' },
            { val:'Live', label:'GPS Tracking' },
            { val:'AI', label:'Identity Verification' },
          ].map(s => (
            <div key={s.label} className="reveal">
              <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:'2.8rem',fontWeight:900,color:'#FF6B6B',letterSpacing:'-0.02em',lineHeight:1 }}>{s.val}</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',color:'rgba(255,255,255,0.5)',marginTop:'0.5rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'5rem 2rem',background:'#0a0a0a',textAlign:'center' }}>
        <div className="reveal" style={{ maxWidth:'600px',margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.025em',marginBottom:'1rem' }}>
            Ready to deploy MediRescue?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.45)',lineHeight:1.7,marginBottom:'2rem',fontSize:'0.95rem' }}>
            Transform your ambulance operations with 30-second dispatch and real-time fleet visibility.
          </p>
          <div style={{ display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap' }}>
            <a href="https://calendly.com/anyhealth-sg/30min" target="_blank" rel="noreferrer" className="btn-primary" style={{ background:'#E53E3E',boxShadow:'0 4px 18px rgba(229,62,62,0.4)' }}>Book a Demo</a>
            <Link to="/" style={{ border:'2px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.7)',fontFamily:"'Poppins',sans-serif",fontWeight:600,borderRadius:'9999px',padding:'0.8rem 2.1rem',display:'inline-block',textDecoration:'none' }}>Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
