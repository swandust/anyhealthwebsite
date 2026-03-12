import clinicMedia from '/brand assets/amb media.png'

const features = [
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M8 12l2 2 4-4" stroke="#5BAE8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#5BAE8C" strokeWidth="2"/></svg>,
    title: '24/7 WhatsApp Booking Bot',
    desc: 'Patients book anytime via WhatsApp — no app download required.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#5BAE8C" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#5BAE8C" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: 'Google Calendar Sync',
    desc: 'All appointments sync instantly with your Google Calendar.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#5BAE8C" strokeWidth="2"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#5BAE8C" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: 'Automated Reminders',
    desc: '1-day and 1-hour automated WhatsApp reminders to slash no-shows by 15%.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#5BAE8C" strokeWidth="2"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#5BAE8C" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: 'Encrypted Medical Certificates',
    desc: 'Secure PDF-locked MCs, invoices, and referral letters via WhatsApp.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#5BAE8C" strokeWidth="2"/></svg>,
    title: 'Post-Visit Follow-ups',
    desc: 'Automated "How are you feeling?" messages improve patient satisfaction.',
  },
]

export default function ClinicFeatures() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <span className="chip mb-4" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>GP & TCM Clinics</span>
          <div className="section-label" style={{ color:'#0D1B4B' }}>
            Clinic<br /><span style={{ color:'#5BAE8C' }}>Dashboard</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <img src={clinicMedia} alt="Clinic Dashboard" className="rounded-2xl w-full" style={{ boxShadow:'0 24px 64px rgba(13,27,75,0.14)' }} />
          </div>
          <div className="grid grid-cols-1 gap-5 reveal">
            {features.map(f => (
              <div key={f.title} className="flex gap-4 items-start p-5 rounded-2xl" style={{ background:'#F0F5F2' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(91,174,140,0.18)' }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#0D1B4B',fontSize:'0.95rem',marginBottom:'0.25rem' }}>{f.title}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',color:'#0D1B4B',opacity:0.6,lineHeight:1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
