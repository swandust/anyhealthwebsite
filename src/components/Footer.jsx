import logo from '/brand assets/Anyhealth logo.png'

export default function Footer() {
  return (
    <footer style={{ background:'#0D1B4B' }} className="py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img src={logo} alt="AnyHealth" className="h-9 mb-4" style={{ filter:'brightness(0) invert(1)' }} />
            <p className="max-w-xs" style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',lineHeight:1.7,color:'rgba(255,255,255,0.45)' }}>
              The WhatsApp-native operating system for clinics and emergency response in Southeast Asia.
            </p>
          </div>
          <div>
            <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'0.85rem',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'1rem' }}>Platform</div>
            <ul className="space-y-2">
              {[['#features','Clinic Dashboard'],['#medirescue','MediRescue'],['#pricing','Pricing']].map(([href,label]) => (
                <li key={label}><a href={href} style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'rgba(255,255,255,0.45)',textDecoration:'none' }}
                  onMouseOver={e=>e.currentTarget.style.color='#5BAE8C'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'0.85rem',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'1rem' }}>Company</div>
            <ul className="space-y-2">
              {[['#about','About'],['#contact','Contact'],['mailto:contact@anyhealth.asia','contact@anyhealth.asia']].map(([href,label]) => (
                <li key={label}><a href={href} style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'rgba(255,255,255,0.45)',textDecoration:'none' }}
                  onMouseOver={e=>e.currentTarget.style.color='#5BAE8C'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor:'rgba(255,255,255,0.1)' }}>
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.3)' }}>© 2025 AnyHealth Sdn Bhd. All rights reserved.</span>
          <div style={{ display:'flex',alignItems:'center',gap:'1rem' }}>
            <a href="https://www.instagram.com/anyhealthglobal/" target="_blank" rel="noreferrer" aria-label="AnyHealth on Instagram"
              style={{ color:'rgba(255,255,255,0.35)',transition:'color 0.2s',display:'flex' }}
              onMouseOver={e=>e.currentTarget.style.color='#5BAE8C'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582629562230" target="_blank" rel="noreferrer" aria-label="AnyHealth on Facebook"
              style={{ color:'rgba(255,255,255,0.35)',transition:'color 0.2s',display:'flex' }}
              onMouseOver={e=>e.currentTarget.style.color='#5BAE8C'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.3)' }}>Stay Healthy, Effortlessly.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
