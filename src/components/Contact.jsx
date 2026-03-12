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
              Ready to eliminate manual inefficiencies? Reach out via the form, WhatsApp us directly, or book a 15-minute demo.
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
            <a href="https://wa.me/601234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white" style={{ background:'#25D366',fontFamily:"'Poppins',sans-serif",fontSize:'0.9rem',boxShadow:'0 6px 20px rgba(37,211,102,0.38)',textDecoration:'none' }}
              onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(37,211,102,0.48)' }}
              onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 20px rgba(37,211,102,0.38)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Chat on WhatsApp
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
