import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', org:'', email:'', phone:'', inquiry:'', message:'' })

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const inputStyle = {
    width:'100%', padding:'0.75rem 1rem', borderRadius:'0.75rem',
    border:'2px solid #E8EEF0', fontFamily:"'Inter',sans-serif",
    color:'#0D1B4B', fontSize:'0.875rem', outline:'none',
    transition:'border-color 0.2s', background:'#fff',
  }
  const focus = e => e.target.style.borderColor = '#5BAE8C'
  const blur  = e => e.target.style.borderColor = '#E8EEF0'
  const labelStyle = { fontFamily:"'Poppins',sans-serif",fontSize:'0.78rem',fontWeight:700,color:'#0D1B4B',display:'block',marginBottom:'0.4rem',letterSpacing:'0.04em',textTransform:'uppercase' }

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left */}
          <div className="reveal">
            <span className="chip mb-4" style={{ background:'rgba(91,174,140,0.12)',color:'#4A9960' }}>Get In Touch</span>
            <div className="section-label mb-6" style={{ color:'#0D1B4B',fontSize:'clamp(2.5rem,5vw,5rem)' }}>Let's Talk.</div>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'1rem',lineHeight:1.8,color:'#0D1B4B',opacity:0.6,marginBottom:'2rem' }}>
              Ready to eliminate manual inefficiencies? Reach out via the form or book a 15-minute demo.
            </p>
            <div className="space-y-4 mb-8">
              <a href="https://anyhealth.asia" className="flex items-center gap-3" style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'#0D1B4B',opacity:0.7,textDecoration:'none' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#5BAE8C" strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#5BAE8C" strokeWidth="2"/></svg>
                anyhealth.asia
              </a>
              <a href="mailto:contact@anyhealth.asia" className="flex items-center gap-3" style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'#0D1B4B',opacity:0.7,textDecoration:'none' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#5BAE8C" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="#5BAE8C" strokeWidth="2"/></svg>
                contact@anyhealth.asia
              </a>
              <div className="flex items-center gap-3" style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'#0D1B4B',opacity:0.7 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#5BAE8C" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#5BAE8C" strokeWidth="2"/></svg>
                Selangor · Penang · Johor Bahru
              </div>
            </div>
            <a href="https://calendly.com/anyhealth-sg/30min" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white" style={{ background:'#5BAE8C',fontFamily:"'Poppins',sans-serif",fontSize:'0.9rem',boxShadow:'0 6px 20px rgba(91,174,140,0.38)',textDecoration:'none' }}
              onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(91,174,140,0.48)' }}
              onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 20px rgba(91,174,140,0.38)' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3" stroke="#fff" strokeWidth="2"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              Book a Demo
            </a>
          </div>

          {/* Form */}
          <div className="reveal">
            <form className="bg-white rounded-3xl p-8" style={{ boxShadow:'0 12px 40px rgba(13,27,75,0.09)' }} onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input name="name" type="text" placeholder="Dr. Ahmad" style={inputStyle} value={form.name} onChange={handle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Clinic / Org *</label>
                  <input name="org" type="text" placeholder="One Care Clinic" style={inputStyle} value={form.org} onChange={handle} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" placeholder="you@clinic.com" style={inputStyle} value={form.email} onChange={handle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input name="phone" type="tel" placeholder="+60 12 345 6789" style={inputStyle} value={form.phone} onChange={handle} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div className="mb-4">
                <label style={labelStyle}>Inquiry Type</label>
                <select name="inquiry" style={inputStyle} value={form.inquiry} onChange={handle} onFocus={focus} onBlur={blur}>
                  <option value="">Select an option...</option>
                  <option>Clinic Automation (Basic)</option>
                  <option>Clinic Automation (Premium)</option>
                  <option>MediRescue / Enterprise</option>
                  <option>Book a Demo</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="mb-6">
                <label style={labelStyle}>Message</label>
                <textarea name="message" rows={3} placeholder="Tell us about your clinic or operation..." style={{ ...inputStyle, resize:'none' }} value={form.message} onChange={handle} onFocus={focus} onBlur={blur} />
              </div>
              <button type="submit" className="btn-primary w-full text-center">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
