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
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.3)' }}>Stay Healthy, Effortlessly.</span>
        </div>
      </div>
    </footer>
  )
}
