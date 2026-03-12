import { Link } from 'react-router-dom'
import ambMedia from '/brand assets/amb media.png'
import clinicMedia from '/brand assets/clinic media.png'

export default function Services() {
  return (
    <section id="services" className="bg-cream py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-14 reveal">
          <div>
            <span className="chip mb-4" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>Our Platform</span>
            <div className="section-label" style={{ color:'#0D1B4B' }}>Services</div>
          </div>
          <p className="hidden md:block max-w-sm text-right pb-2" style={{ fontFamily:"'Inter',sans-serif",color:'#0D1B4B',opacity:0.55,fontSize:'1rem',lineHeight:1.7 }}>
            Two core pillars built to eliminate manual healthcare inefficiencies in Southeast Asia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Clinic card */}
          <div className="feature-card rounded-3xl overflow-hidden bg-white reveal" style={{ boxShadow:'0 8px 32px rgba(13,27,75,0.08)' }}>
            <div className="relative overflow-hidden" style={{ height:'260px',background:'linear-gradient(135deg,#0D1B4B,#2D5A3D)' }}>
              <img src={ambMedia} alt="Clinic Suite Dashboard" className="absolute bottom-0 right-0 h-full w-full object-cover" style={{ opacity:0.9 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="chip" style={{ background:'rgba(91,174,140,0.22)',color:'#5BAE8C' }}>Clinic Suite</span>
              </div>
            </div>
            <div className="p-8">
              <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'1.75rem',fontWeight:800,color:'#0D1B4B',letterSpacing:'-0.02em',marginBottom:'0.75rem' }}>
                GP & TCM Clinic Automation
              </h2>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',lineHeight:1.7,color:'#0D1B4B',opacity:0.6,marginBottom:'1.5rem' }}>
                24/7 WhatsApp booking bot, Google Calendar sync, automated reminders and post-visit follow-ups — all without patients downloading any app.
              </p>
              <Link to="/clinic" className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color:'#4A9960',fontFamily:"'Poppins',sans-serif" }}>
                Learn more
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* MediRescue card */}
          <div className="feature-card rounded-3xl overflow-hidden bg-white reveal" style={{ boxShadow:'0 8px 32px rgba(13,27,75,0.08)' }}>
            <div className="relative overflow-hidden" style={{ height:'260px',background:'linear-gradient(135deg,#1a0505,#5a0d0d)' }}>
              <img src={clinicMedia} alt="MediRescue App" className="absolute bottom-0 right-0 h-full w-full object-cover" style={{ opacity:0.85,mixBlendMode:'luminosity' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="chip" style={{ background:'rgba(220,60,60,0.22)',color:'#FF6B6B' }}>MediRescue</span>
              </div>
            </div>
            <div className="p-8">
              <h2 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'1.75rem',fontWeight:800,color:'#0D1B4B',letterSpacing:'-0.02em',marginBottom:'0.75rem' }}>
                MediRescue Ambulance System
              </h2>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',lineHeight:1.7,color:'#0D1B4B',opacity:0.6,marginBottom:'1.5rem' }}>
                30-second dispatch with live GPS tracking, crew mobile app, and AI identity verification (YOLO + DeepFace) to stop hoax calls cold.
              </p>
              <Link to="/ambulance" className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color:'#E53E3E',fontFamily:"'Poppins',sans-serif" }}>
                Learn more
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
