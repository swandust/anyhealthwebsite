const stats = [
  {
    val: '82%',
    label: 'WhatsApp Response Rate',
    desc: 'Patients respond to automated follow-ups and reminders via WhatsApp — no app download required.',
  },
  {
    val: '~70',
    label: 'Notifications Sent / Day',
    desc: 'Per clinic, our system automatically dispatches appointment reminders, follow-ups, and health nudges daily.',
  },
  {
    val: '2 hrs',
    label: 'Admin Time Saved Daily',
    desc: 'Clinics reclaim over 2 hours of front-desk work every day — time redirected to patient care.',
  },
]

export default function Analytics() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div><span className="chip mb-4" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>Data-Driven Decisions</span></div>
          <div className="section-label" style={{ color:'#0D1B4B' }}>Analytics</div>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily:"'Inter',sans-serif",color:'#0D1B4B',opacity:0.55,fontSize:'1rem',lineHeight:1.7 }}>
            Real numbers from clinics already running on AnyHealth.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 reveal">
          {stats.map(s => (
            <div key={s.label} className="feature-card bg-white rounded-3xl p-8 text-center" style={{ boxShadow:'0 8px 32px rgba(13,27,75,0.07)' }}>
              <div className="font-black mb-3" style={{ fontFamily:"'Poppins',sans-serif",fontSize:'3rem',color:'#5BAE8C',letterSpacing:'-0.02em' }}>{s.val}</div>
              <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#0D1B4B',fontSize:'1.05rem',marginBottom:'0.5rem' }}>{s.label}</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'#0D1B4B',opacity:0.55,lineHeight:1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
