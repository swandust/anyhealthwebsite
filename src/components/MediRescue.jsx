import ambMedia from '/brand assets/clinic media.png'

const features = [
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="#FF6B6B" strokeWidth="2"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: '30-Second Dispatch',
    desc: 'Industry-fastest ambulance dispatch with live GPS squad tracking and accurate ETAs.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="#FF6B6B" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#FF6B6B" strokeWidth="2"/></svg>,
    title: 'Live GPS Tracking',
    desc: 'Real-time ambulance positions on dispatch map. Patients and hospitals see ETAs live.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" stroke="#FF6B6B" strokeWidth="2"/><path d="M12 18h.01" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: 'Crew Mobile App',
    desc: 'One-tap "Dispatched" and "Picked Up" status updates for the ambulance crew.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/><path d="M9 12l2 2 4-4" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'AI Identity Verification',
    desc: 'YOLO + OpenCV + DeepFace AI stack verifies callers and eliminates hoax emergency calls.',
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#FF6B6B" strokeWidth="2"/><polyline points="9 22 9 12 15 12 15 22" stroke="#FF6B6B" strokeWidth="2"/></svg>,
    title: 'Fleet Management',
    desc: 'Track road tax renewals, maintenance schedules, and vehicle status across your fleet.',
  },
]

export default function MediRescue() {
  return (
    <section
      id="medirescue"
      className="py-24 grain relative overflow-hidden"
      style={{ background:'linear-gradient(135deg,#0D1B4B 0%,#1a0a0a 100%)' }}
    >
      <div className="absolute pointer-events-none z-0" style={{ top:'-20%',right:'-10%',width:'60vw',height:'60vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(220,60,60,0.12) 0%,transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 reveal">
          <span className="chip mb-4" style={{ background:'rgba(220,60,60,0.18)',color:'#FF6B6B' }}>Ambulance Dispatch</span>
          <div className="section-label" style={{ color:'#fff' }}>
            Medi<span style={{ color:'#FF6B6B' }}>Rescue</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-1 gap-5 reveal">
            {features.map(f => (
              <div key={f.title} className="flex gap-4 items-start p-5 rounded-2xl" style={{ background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(220,60,60,0.2)' }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'0.95rem',marginBottom:'0.25rem' }}>{f.title}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',color:'rgba(255,255,255,0.55)',lineHeight:1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal">
            <img src={ambMedia} alt="MediRescue App" className="rounded-2xl w-full" style={{ boxShadow:'0 24px 64px rgba(0,0,0,0.5),0 4px 16px rgba(220,60,60,0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
