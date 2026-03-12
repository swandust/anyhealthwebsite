function CheckIcon({ color = '#5BAE8C' }) {
  return (
    <svg className="mt-0.5 flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill={color} opacity="0.15"/>
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const basicFeatures = [
  '24/7 WhatsApp Booking Bot',
  'Google Calendar Integration',
  'Automated Reminders (1-day, 1-hour)',
  'Basic Patient Registration',
  'Standard Support',
]
const premiumFeatures = [
  'Everything in Basic, plus:',
  'Post-Visit Follow-up Automation',
  'Full EMR & Consultation Notes',
  'Inventory & Billing Management',
  'Encrypted Medical Certificates & Referrals',
  'Multi-Branch Connectivity',
  'Analytics Dashboard',
]
const enterpriseFeatures = [
  'Full Clinic Suite',
  'Emergency Control Center Dashboard',
  'Ambulance Crew Mobile App',
  'Live GPS Tracking & Routing',
  'AI Identity Verification',
  'Fleet & Maintenance Management',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div><span className="chip mb-4" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>Simple Pricing</span></div>
          <div className="section-label" style={{ color:'#0D1B4B' }}>Pricing</div>
          <p className="mt-4 max-w-md mx-auto" style={{ fontFamily:"'Inter',sans-serif",color:'#0D1B4B',opacity:0.55,fontSize:'1rem',lineHeight:1.7 }}>
            No hidden fees. First month free on Basic. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 reveal">
          {/* Basic */}
          <div className="price-card rounded-3xl p-8 border-2" style={{ borderColor:'#E8EEF0',background:'#fff' }}>
            <span className="chip mb-5" style={{ background:'rgba(91,174,140,0.1)',color:'#4A9960' }}>Basic Clinic</span>
            <div className="mb-2">
              <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'2.8rem',fontWeight:900,color:'#0D1B4B',letterSpacing:'-0.03em' }}>RM 200</span>
              <span style={{ fontFamily:"'Inter',sans-serif",color:'#0D1B4B',opacity:0.45,fontSize:'0.9rem' }}>/month</span>
            </div>
            <div className="mb-2"><span className="chip" style={{ background:'#5BAE8C',color:'#fff',fontSize:'0.65rem' }}>1st Month Free</span></div>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'#0D1B4B',opacity:0.55,margin:'1rem 0 1.5rem',lineHeight:1.6 }}>
              Perfect for single-doctor GP or TCM clinics.
            </p>
            <ul className="space-y-3 mb-8">
              {basicFeatures.map(f => (
                <li key={f} className="flex gap-3 items-start">
                  <CheckIcon />
                  <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'#0D1B4B',opacity:0.75,lineHeight:1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all" style={{ fontFamily:"'Poppins',sans-serif",border:'2px solid #5BAE8C',color:'#5BAE8C',textDecoration:'none' }}
              onMouseOver={e => { e.currentTarget.style.background='#5BAE8C'; e.currentTarget.style.color='#fff' }}
              onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#5BAE8C' }}>
              Get Started Free
            </a>
          </div>

          {/* Premium */}
          <div className="price-card rounded-3xl p-8 relative" style={{ background:'linear-gradient(145deg,#0D1B4B,#1a3060)',boxShadow:'0 24px 64px rgba(13,27,75,0.35)' }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="chip" style={{ background:'#5BAE8C',color:'#fff',fontSize:'0.65rem',boxShadow:'0 4px 12px rgba(91,174,140,0.45)' }}>Most Popular</span>
            </div>
            <span className="chip mb-5" style={{ background:'rgba(91,174,140,0.2)',color:'#5BAE8C' }}>Premium Clinic</span>
            <div className="mb-2">
              <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'2.8rem',fontWeight:900,color:'#fff',letterSpacing:'-0.03em' }}>RM 350</span>
              <span style={{ fontFamily:"'Inter',sans-serif",color:'rgba(255,255,255,0.45)',fontSize:'0.9rem' }}>/month</span>
            </div>
            <div className="mb-2 h-6" />
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'rgba(255,255,255,0.55)',margin:'1rem 0 1.5rem',lineHeight:1.6 }}>
              For growing clinics and multi-branch practices.
            </p>
            <ul className="space-y-3 mb-8">
              {premiumFeatures.map(f => (
                <li key={f} className="flex gap-3 items-start">
                  <CheckIcon color="#5BAE8C" />
                  <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'rgba(255,255,255,0.8)',lineHeight:1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-primary block text-center" style={{ textDecoration:'none' }}>Get Premium</a>
          </div>

          {/* Enterprise */}
          <div className="price-card rounded-3xl p-8 border-2" style={{ borderColor:'#E8EEF0',background:'#fff' }}>
            <span className="chip mb-5" style={{ background:'rgba(220,60,60,0.1)',color:'#E53E3E' }}>MediRescue / Enterprise</span>
            <div className="mb-2">
              <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'2.8rem',fontWeight:900,color:'#0D1B4B',letterSpacing:'-0.03em' }}>Custom</span>
            </div>
            <div className="mb-2 h-6" />
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'#0D1B4B',opacity:0.55,margin:'1rem 0 1.5rem',lineHeight:1.6 }}>
              For ambulance fleets, hospitals, and enterprise networks.
            </p>
            <ul className="space-y-3 mb-8">
              {enterpriseFeatures.map(f => (
                <li key={f} className="flex gap-3 items-start">
                  <CheckIcon color="#E53E3E" />
                  <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'#0D1B4B',opacity:0.75,lineHeight:1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all" style={{ fontFamily:"'Poppins',sans-serif",border:'2px solid #E53E3E',color:'#E53E3E',textDecoration:'none' }}
              onMouseOver={e => { e.currentTarget.style.background='#E53E3E'; e.currentTarget.style.color='#fff' }}
              onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#E53E3E' }}>
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
