const team = [
  {
    name: 'Mah Zhang Rong',
    role: 'Founder, Software & Ops Lead',
    bio: 'Full-stack architect behind AnyHealth\'s WhatsApp engine and clinic operating system.',
    grad: 'linear-gradient(135deg,#5BAE8C,#2D5A3D)',
    linkedin: 'https://www.linkedin.com/in/rong-mah-1a6939237/',
  },
  {
    name: 'Xuan Wong',
    role: 'Co-Founder, Strategy & Operations',
    bio: 'Drives strategy, operations & outreach/marketing — scaling AnyHealth across Southeast Asia.',
    grad: 'linear-gradient(135deg,#4A9960,#0D1B4B)',
    linkedin: 'https://www.linkedin.com/in/xuan-wong-bioeng-ntu/',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background:'linear-gradient(135deg,#F0F5F2,#fff)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Mission */}
          <div className="reveal">
            <span className="chip mb-4" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>Our Mission</span>
            <div className="section-label mb-6" style={{ color:'#0D1B4B',fontSize:'clamp(2.5rem,5vw,5.5rem)' }}>
              Built to<br /><span style={{ color:'#5BAE8C' }}>Eradicate</span><br />Inefficiency.
            </div>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'1rem',lineHeight:1.8,color:'#0D1B4B',opacity:0.65,marginBottom:'1.5rem' }}>
              Our mission is to eradicate manual healthcare inefficiencies and bridge the gap between primary care and critical emergency transport in Southeast Asia.
            </p>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'1rem',lineHeight:1.8,color:'#0D1B4B',opacity:0.65,marginBottom:'2rem' }}>
              Born at <strong style={{ opacity:1,color:'#0D1B4B' }}>Nanyang Technological University (NTU)</strong> and backed by the MDT Grant, we rapidly scaled from prototyping to nationwide deployment across Malaysia — active in <strong style={{ opacity:1 }}>Selangor, Penang, and Johor Bahru</strong>.
            </p>
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: '★', label: 'MDT Grant' },
                { icon: '⌂', label: 'NTU Singapore' },
                { icon: '◉', label: 'Malaysia-Wide' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background:'#fff',boxShadow:'0 4px 16px rgba(13,27,75,0.08)' }}>
                  <span style={{ color:'#5BAE8C' }}>{b.icon}</span>
                  <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'0.8rem',fontWeight:700,color:'#0D1B4B' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="reveal">
            <span className="chip mb-6" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>The Team</span>
            <div className="space-y-6">
              {team.map(m => (
                <div key={m.name} className="flex gap-5 items-center p-6 rounded-2xl bg-white" style={{ boxShadow:'0 6px 24px rgba(13,27,75,0.07)' }}>
                  <div className="w-14 h-14 rounded-2xl flex-shrink-0 overflow-hidden" style={{ background:m.grad }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:'#0D1B4B',fontSize:'1.05rem' }}>{m.name}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',color:'#5BAE8C',fontWeight:600,marginBottom:'0.35rem' }}>{m.role}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.825rem',color:'#0D1B4B',opacity:0.55,lineHeight:1.5 }}>{m.bio}</div>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2"
                      style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.78rem',fontWeight:600,color:'#0077B5',textDecoration:'none',opacity:0.85,transition:'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity='1'}
                      onMouseLeave={e => e.currentTarget.style.opacity='0.85'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
