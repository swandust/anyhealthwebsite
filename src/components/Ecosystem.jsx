import { useEffect, useRef, useState } from 'react'
import logo from '/brand assets/3.png'

// SVG diagram coordinate space
const VB_W = 1100
const VB_H = 520
const HUB_X = 550
const HUB_Y = 260

const LEFT_NODES = [
  { id: 'gp',        label: 'GP Clinics',        icon: '🏥', sx: 150, sy:  43, color: '#5BAE8C',
    desc: 'Primary care bookings, automated appointment reminders, and post-visit follow-ups — all through WhatsApp.' },
  { id: 'physio',    label: 'Physiotherapy',     icon: '🦴', sx: 150, sy: 127, color: '#4ECDC4',
    desc: 'Session scheduling and patient progress tracking for physio clinics, with zero manual admin.' },
  { id: 'chiro',     label: 'Chiropractic',      icon: '🧘', sx: 150, sy: 212, color: '#45B7D1',
    desc: 'Automated recall reminders and session management that keep chiropractic patients returning.' },
  { id: 'dental',    label: 'Dentistry',          icon: '🦷', sx: 150, sy: 296, color: '#96CEB4',
    desc: 'Check-up reminders, treatment plans, and invoices delivered securely via WhatsApp.' },
  { id: 'aesthetic', label: 'Aesthetic / Beauty', icon: '✨', sx: 150, sy: 381, color: '#FFEAA7',
    desc: 'Booking automation and post-treatment follow-up workflows for aesthetic and beauty clinics.' },
  { id: 'ambulance', label: 'Ambulance',          icon: '🚑', sx: 150, sy: 465, color: '#FF6B6B',
    desc: 'MediRescue dispatches ambulances in 10 seconds via WhatsApp with live GPS crew coordination.' },
]

const RIGHT_NODES = [
  { id: 'tcm',      label: 'TCM',          icon: '☯️', sx: 950, sy:  87, color: '#A29BFE',
    desc: 'Traditional Chinese Medicine: multi-session scheduling and herbal prescription sharing via WhatsApp.' },
  { id: 'rehab',    label: 'Rehab',         icon: '♿', sx: 950, sy: 193, color: '#FD79A8',
    desc: 'Rehab program scheduling, milestone check-ins, and progress reports shared with patients and families.' },
  { id: 'dialysis', label: 'Dialysis',      icon: '💊', sx: 950, sy: 299, color: '#74B9FF',
    desc: 'Recurring session management, medication reminders, and real-time updates for dialysis centres.' },
  { id: 'elderly',  label: 'Elderly Care', icon: '👴', sx: 950, sy: 405, color: '#55EFC4',
    desc: 'Daily wellness checks, fall detection alerts, and family notification workflows for elderly care homes.' },
]

const ALL_NODES = [...LEFT_NODES, ...RIGHT_NODES]

const PATHWAY_STEPS = [
  { num: '1', title: 'Booking',      icon: '📱', desc: 'Patient selects service via WhatsApp — no app download needed.' },
  { num: '2', title: 'Registration', icon: '✅', desc: 'Staff verify patient identity via the Registration Module.' },
  { num: '3', title: 'Consult',      icon: '🩺', desc: 'Dashboard manages structured consultations and clinical notes.' },
  { num: '4', title: 'Referral',     icon: '📋', desc: 'Secure case transfers and MCs issued instantly via WhatsApp.' },
  { num: '5', title: 'Follow-up',    icon: '💬', desc: 'Automated post-visit recovery tracking and satisfaction checks.' },
]

// Convert SVG coord to percentage for HTML absolute positioning
const px = (v, total) => `${(v / total * 100).toFixed(2)}%`

export default function Ecosystem() {
  const sectionRef  = useRef(null)
  const pathwayRef  = useRef(null)
  const [visible, setVisible]         = useState(false)
  const [pathwayVis, setPathwayVis]   = useState(false)
  const [selected, setSelected]       = useState(null)   // node id or null

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = pathwayRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPathwayVis(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const sel = selected ? ALL_NODES.find(n => n.id === selected) : null

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(180deg,#0D1B4B 0%,#091230 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4.5rem 1rem 3.5rem',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @keyframes ecoRingPulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.45; }
          100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
        }
        @keyframes ecoHubIn {
          from { opacity:0; transform:translate(-50%,-50%) scale(0.75); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes ecoNodeIn {
          from { opacity:0; transform:translate(-50%,-50%) scale(0.55); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes drawEcoLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ecoDetailSlide {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .eco-hub {
          position:absolute;
          border-radius:50%;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          cursor:default; z-index:10;
          background: linear-gradient(135deg,#5BAE8C,#2D5A3D);
          border: 2px solid rgba(91,174,140,0.6);
          box-shadow: 0 0 48px rgba(91,174,140,0.25), 0 0 100px rgba(91,174,140,0.1);
          opacity:0;
          width: 12%; aspect-ratio:1;
          left:${px(HUB_X, VB_W)}; top:${px(HUB_Y, VB_H)};
          transform:translate(-50%,-50%);
        }
        .eco-visible .eco-hub {
          animation: ecoHubIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s forwards;
        }

        .eco-ring {
          position:absolute;
          border-radius:50%;
          border:1.5px solid rgba(91,174,140,0.35);
          pointer-events:none; z-index:9;
          width:12%; aspect-ratio:1;
          left:${px(HUB_X, VB_W)}; top:${px(HUB_Y, VB_H)};
          transform:translate(-50%,-50%);
        }
        .eco-visible .eco-ring-1 { animation: ecoRingPulse 2.4s ease-out 0.8s infinite; }
        .eco-visible .eco-ring-2 { animation: ecoRingPulse 2.4s ease-out 2.0s infinite; }

        .eco-node {
          position:absolute;
          transform:translate(-50%,-50%);
          width:12.5%;
          border-radius:14px;
          background:rgba(255,255,255,0.05);
          border:1.5px solid rgba(255,255,255,0.1);
          padding:0.55em 0.35em;
          display:flex; flex-direction:column;
          align-items:center; gap:0.3em;
          cursor:pointer; z-index:10;
          opacity:0;
          transition: border-color 0.25s ease, background 0.25s ease,
                      box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .eco-visible .eco-node {
          animation: ecoNodeIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .eco-node:hover {
          background: rgba(255,255,255,0.1);
          transform: translate(-50%,-50%) scale(1.08);
        }
        .eco-node.eco-selected {
          transform: translate(-50%,-50%) scale(1.1);
        }

        .eco-line {
          stroke-dasharray: 720;
          stroke-dashoffset: 720;
          transition: stroke 0.3s ease, stroke-width 0.3s ease;
        }
        .eco-visible .eco-line {
          animation: drawEcoLine 0.85s ease forwards;
        }

        .eco-detail-card { animation: ecoDetailSlide 0.3s ease forwards; }

        @media (max-width: 680px) {
          .eco-diagram-outer { display:none !important; }
          .eco-detail-zone   { display:none !important; }
          .eco-mobile-grid   { display:grid !important; }
        }
        .eco-mobile-grid { display:none; }
      `}</style>

      {/* Background ambience */}
      <div style={{ position:'absolute',top:'15%',left:'5%',width:'35vw',height:'35vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(91,174,140,0.05) 0%,transparent 70%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'20%',right:'5%',width:'28vw',height:'28vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(162,155,254,0.06) 0%,transparent 70%)',pointerEvents:'none' }} />

      {/* ── Header ── */}
      <div style={{
        textAlign:'center', maxWidth:'680px', margin:'0 auto 2rem', padding:'0 1rem',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <span style={{ background:'rgba(91,174,140,0.12)',color:'#5BAE8C',fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.35rem 0.9rem',borderRadius:'9999px',border:'1px solid rgba(91,174,140,0.2)',display:'inline-block',marginBottom:'1.25rem' }}>
          Provider Ecosystem
        </span>
        <h2 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:900,color:'#fff',fontSize:'clamp(1.85rem,4vw,3rem)',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'1rem' }}>
          The Seamless <span style={{ color:'#5BAE8C' }}>WhatsApp-Powered</span><br />Healthcare Ecosystem
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.92rem',color:'rgba(255,255,255,0.4)',lineHeight:1.75 }}>
          Connecting diverse healthcare providers into one unified care pathway.<br />
          <span style={{ color:'rgba(255,255,255,0.25)',fontSize:'0.82rem' }}>Click any provider to explore the integration.</span>
        </p>
      </div>

      {/* ── Diagram (desktop) ── */}
      <div className={`eco-diagram-outer${visible ? ' eco-visible' : ''}`} style={{
        position:'relative', width:'100%', maxWidth:'1100px', margin:'0 auto',
        paddingTop:'47.3%',  /* 520/1100 aspect ratio */
      }}>
        <div style={{ position:'absolute', inset:0 }}>

          {/* SVG lines */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'visible' }}
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5BAE8C" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#5BAE8C" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx={HUB_X} cy={HUB_Y} r="140" fill="url(#hubGlow)" />

            {/* Left provider lines */}
            {LEFT_NODES.map((n, i) => (
              <line key={n.id}
                className="eco-line"
                x1={n.sx} y1={n.sy} x2={HUB_X} y2={HUB_Y}
                stroke={selected === n.id ? n.color : 'rgba(91,174,140,0.25)'}
                strokeWidth={selected === n.id ? 2 : 1.2}
                style={{ animationDelay: `${0.35 + i * 0.07}s` }}
              />
            ))}

            {/* Right provider lines */}
            {RIGHT_NODES.map((n, i) => (
              <line key={n.id}
                className="eco-line"
                x1={n.sx} y1={n.sy} x2={HUB_X} y2={HUB_Y}
                stroke={selected === n.id ? n.color : 'rgba(162,155,254,0.25)'}
                strokeWidth={selected === n.id ? 2 : 1.2}
                style={{ animationDelay: `${0.35 + i * 0.07}s` }}
              />
            ))}

            {/* Section labels */}
            <text x="150" y="20" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">
              Main Providers
            </text>
            <text x="950" y="20" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">
              Allied Health
            </text>
          </svg>

          {/* Hub pulse rings */}
          <div className="eco-ring eco-ring-1" />
          <div className="eco-ring eco-ring-2" />

          {/* Hub center button */}
          <div className="eco-hub">
            <img src={logo} alt="AnyHealth" style={{ width:'55%', filter:'brightness(0) invert(1)', marginBottom:'0.2em' }} />
            <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:'#fff',fontSize:'clamp(0.4rem,0.85vw,0.65rem)',textAlign:'center',lineHeight:1.2,letterSpacing:'0.01em' }}>
              Provider<br/>Network
            </span>
          </div>

          {/* Center subtitle below hub */}
          <div style={{ position:'absolute',left:px(HUB_X,VB_W),top:`calc(${px(HUB_Y,VB_H)} + 8%)`,transform:'translate(-50%,0)',width:'16%',textAlign:'center',pointerEvents:'none' }}>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'clamp(0.38rem,0.65vw,0.58rem)',color:'rgba(255,255,255,0.3)',lineHeight:1.5,margin:0 }}>
              Unified Patient<br/>Care Pathway
            </p>
          </div>

          {/* Left nodes */}
          {LEFT_NODES.map((n, i) => (
            <button
              key={n.id}
              className={`eco-node${selected === n.id ? ' eco-selected' : ''}`}
              onClick={() => setSelected(s => s === n.id ? null : n.id)}
              style={{
                left: px(n.sx, VB_W),
                top:  px(n.sy, VB_H),
                borderColor: selected === n.id ? n.color : undefined,
                boxShadow:   selected === n.id ? `0 0 28px ${n.color}55` : undefined,
                background:  selected === n.id ? `${n.color}15` : undefined,
                animationDelay: `${0.65 + i * 0.07}s`,
              }}
            >
              <span style={{ fontSize:'clamp(0.85rem,1.6vw,1.3rem)', lineHeight:1 }}>{n.icon}</span>
              <span style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:700,
                fontSize:'clamp(0.4rem,0.78vw,0.65rem)',
                color: selected === n.id ? n.color : 'rgba(255,255,255,0.85)',
                textAlign:'center', lineHeight:1.25,
                transition:'color 0.2s ease',
              }}>{n.label}</span>
            </button>
          ))}

          {/* Right nodes */}
          {RIGHT_NODES.map((n, i) => (
            <button
              key={n.id}
              className={`eco-node${selected === n.id ? ' eco-selected' : ''}`}
              onClick={() => setSelected(s => s === n.id ? null : n.id)}
              style={{
                left: px(n.sx, VB_W),
                top:  px(n.sy, VB_H),
                borderColor: selected === n.id ? n.color : undefined,
                boxShadow:   selected === n.id ? `0 0 28px ${n.color}55` : undefined,
                background:  selected === n.id ? `${n.color}15` : undefined,
                animationDelay: `${0.65 + i * 0.07}s`,
              }}
            >
              <span style={{ fontSize:'clamp(0.85rem,1.6vw,1.3rem)', lineHeight:1 }}>{n.icon}</span>
              <span style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:700,
                fontSize:'clamp(0.4rem,0.78vw,0.65rem)',
                color: selected === n.id ? n.color : 'rgba(255,255,255,0.85)',
                textAlign:'center', lineHeight:1.25,
                transition:'color 0.2s ease',
              }}>{n.label}</span>
            </button>
          ))}

        </div>
      </div>

      {/* ── Detail card ── */}
      <div className="eco-detail-zone" style={{
        maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem', width:'100%',
        minHeight: sel ? '88px' : '0',
        overflow: 'hidden',
      }}>
        {sel && (
          <div className="eco-detail-card" style={{
            marginTop:'1rem',
            background:`linear-gradient(135deg,${sel.color}12,rgba(255,255,255,0.03))`,
            border:`1px solid ${sel.color}44`,
            borderRadius:'20px',
            padding:'1.25rem 1.75rem',
            display:'flex', alignItems:'center', gap:'1.25rem',
            boxShadow:`0 8px 40px ${sel.color}18`,
          }}>
            <div style={{ fontSize:'2.2rem', lineHeight:1, flexShrink:0 }}>{sel.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:sel.color,fontSize:'1rem',marginBottom:'0.3rem' }}>{sel.label}</div>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.875rem',color:'rgba(255,255,255,0.55)',lineHeight:1.65,margin:0 }}>{sel.desc}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{ background:'none',border:'none',color:'rgba(255,255,255,0.25)',cursor:'pointer',fontSize:'1.1rem',flexShrink:0,padding:'0.25rem',lineHeight:1,transition:'color 0.2s ease' }}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.25)'}
            >✕</button>
          </div>
        )}
      </div>

      {/* ── Mobile grid fallback ── */}
      <div className="eco-mobile-grid" style={{
        maxWidth:'540px', margin:'0 auto', width:'100%', padding:'0 1rem',
        gridTemplateColumns:'repeat(2,1fr)', gap:'0.7rem',
      }}>
        {ALL_NODES.map(n => (
          <button
            key={n.id}
            onClick={() => setSelected(s => s === n.id ? null : n.id)}
            style={{
              background: selected === n.id ? `${n.color}15` : 'rgba(255,255,255,0.05)',
              border:`1px solid ${selected === n.id ? n.color : 'rgba(255,255,255,0.1)'}`,
              borderRadius:'12px', padding:'0.9rem', display:'flex', flexDirection:'column',
              alignItems:'flex-start', gap:'0.4rem', cursor:'pointer', textAlign:'left',
              transition:'border-color 0.2s, background 0.2s',
            }}
          >
            <span style={{ fontSize:'1.4rem' }}>{n.icon}</span>
            <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:selected===n.id?n.color:'#fff',fontSize:'0.8rem',lineHeight:1.25 }}>{n.label}</span>
          </button>
        ))}
        {/* Mobile detail card */}
        {sel && (
          <div style={{ gridColumn:'1/-1',background:`${sel.color}12`,border:`1px solid ${sel.color}44`,borderRadius:'14px',padding:'1rem 1.25rem',display:'flex',gap:'0.875rem',alignItems:'flex-start' }}>
            <span style={{ fontSize:'1.8rem' }}>{sel.icon}</span>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:sel.color,fontSize:'0.9rem',marginBottom:'0.25rem' }}>{sel.label}</div>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.5)',lineHeight:1.6,margin:0 }}>{sel.desc}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── 5-Step Pathway ── */}
      <div ref={pathwayRef} style={{ maxWidth:'1100px', margin:'2rem auto 0', padding:'0 1.5rem', width:'100%' }}>
        <div style={{
          textAlign:'center', marginBottom:'1.5rem',
          opacity: pathwayVis ? 1 : 0, transform: pathwayVis ? 'none' : 'translateY(16px)',
          transition:'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'rgba(255,255,255,0.35)',fontSize:'0.68rem',letterSpacing:'0.1em',textTransform:'uppercase' }}>
            5-Step Patient Care Pathway
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'stretch', flexWrap:'wrap', gap:'4px' }}>
          {PATHWAY_STEPS.map((step, i) => (
            <div key={step.num} style={{ flex:'1', minWidth:'140px', display:'flex', alignItems:'center' }}>
              <div style={{
                flex:1,
                background: i === 4 ? 'rgba(91,174,140,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i === 4 ? 'rgba(91,174,140,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius:'14px', padding:'1.1rem 0.9rem',
                display:'flex', flexDirection:'column', gap:'0.5rem',
                opacity: pathwayVis ? 1 : 0,
                transform: pathwayVis ? 'none' : 'translateY(18px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <span style={{
                    background: i === 4 ? '#5BAE8C' : 'rgba(255,255,255,0.1)',
                    color: '#fff', fontFamily:"'Poppins',sans-serif", fontWeight:900,
                    fontSize:'0.68rem', width:'20px', height:'20px', borderRadius:'50%',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  }}>{step.num}</span>
                  <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:i===4?'#5BAE8C':'#fff',fontSize:'0.78rem' }}>{step.title}</span>
                </div>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.72rem',color:'rgba(255,255,255,0.38)',lineHeight:1.6,margin:0 }}>{step.desc}</p>
              </div>
              {i < PATHWAY_STEPS.length - 1 && (
                <div style={{ padding:'0 3px', flexShrink:0 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14" style={{ opacity:0.3 }}>
                    <path d="M5 2.5l4.5 4.5L5 11.5" stroke="#5BAE8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MediRescue band ── */}
      <div style={{
        maxWidth:'1100px', margin:'1.5rem auto 0', padding:'0 1.5rem', width:'100%',
        opacity: pathwayVis ? 1 : 0, transform: pathwayVis ? 'none' : 'translateY(18px)',
        transition:'opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s',
      }}>
        {/* Two emergency cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'0.75rem', marginBottom:'0.75rem' }}>
          <div style={{ background:'rgba(255,107,107,0.07)',border:'1px solid rgba(255,107,107,0.2)',borderRadius:'16px',padding:'1.25rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1rem' }}>
            <div style={{ background:'rgba(255,107,107,0.15)',border:'1px solid rgba(255,107,107,0.3)',borderRadius:'10px',padding:'0.6rem',flexShrink:0,fontSize:'1.3rem',lineHeight:1 }}>🚨</div>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:'#FF6B6B',fontSize:'0.85rem',marginBottom:'0.3rem' }}>10-Second Emergency Activation</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.78rem',color:'rgba(255,255,255,0.4)',lineHeight:1.6 }}>Patient messages via WhatsApp → crew dispatched with live GPS in under 10 seconds.</div>
            </div>
          </div>
          <div style={{ background:'rgba(116,185,255,0.07)',border:'1px solid rgba(116,185,255,0.2)',borderRadius:'16px',padding:'1.25rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1rem' }}>
            <div style={{ background:'rgba(116,185,255,0.15)',border:'1px solid rgba(116,185,255,0.3)',borderRadius:'10px',padding:'0.6rem',flexShrink:0,fontSize:'1.3rem',lineHeight:1 }}>📍</div>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:'#74B9FF',fontSize:'0.85rem',marginBottom:'0.3rem' }}>Scheduled Non-Emergency Transport</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.78rem',color:'rgba(255,255,255,0.4)',lineHeight:1.6 }}>Pre-booked rides with live GPS tracking, ETA notifications, and crew status updates.</div>
            </div>
          </div>
        </div>

        {/* Feature table */}
        <div style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',overflow:'hidden' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1.4fr 1fr',background:'rgba(255,255,255,0.04)',padding:'0.65rem 1.25rem',borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            {['Interaction Type','Primary Function','Key Feature'].map(h => (
              <span key={h} style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'rgba(255,255,255,0.35)',fontSize:'0.68rem',letterSpacing:'0.06em',textTransform:'uppercase' }}>{h}</span>
            ))}
          </div>
          {[
            ['Direct Patient','Booking, Registration, Consultation','WhatsApp Interface'],
            ['Coordination','Referral Management, Follow-up','Secure Data Transfer'],
            ['Data & Analytics','Operational Visibility, Reporting','AI & GPS Integration'],
          ].map(([a,b,c],i) => (
            <div key={i} style={{ display:'grid',gridTemplateColumns:'1fr 1.4fr 1fr',padding:'0.7rem 1.25rem',borderBottom:i<2?'1px solid rgba(255,255,255,0.05)':undefined }}>
              <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.7)',fontWeight:600 }}>{a}</span>
              <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.4)' }}>{b}</span>
              <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'#5BAE8C',fontWeight:600 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
