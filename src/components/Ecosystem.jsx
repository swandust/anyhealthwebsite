import { useEffect, useRef, useState } from 'react'
import logo from '/brand assets/3.png'

// ── Provider pathway data ─────────────────────────────────────────
const PROVIDERS = [
  { id: 'gp',        label: 'GP Clinic',      icon: '🏥', color: '#5BAE8C' },
  { id: 'physio',    label: 'Physiotherapy',  icon: '🦴', color: '#4ECDC4' },
  { id: 'chiro',     label: 'Chiropractic',   icon: '🧘', color: '#45B7D1' },
  { id: 'dental',    label: 'Dentistry',      icon: '🦷', color: '#96CEB4' },
  { id: 'aesthetic', label: 'Aesthetic',      icon: '✨', color: '#FFEAA7' },
  { id: 'ambulance', label: 'Ambulance',      icon: '🚑', color: '#FF6B6B' },
  { id: 'tcm',       label: 'TCM',            icon: '☯️', color: '#A29BFE' },
  { id: 'rehab',     label: 'Rehab',          icon: '♿', color: '#FD79A8' },
  { id: 'dialysis',  label: 'Dialysis',       icon: '💊', color: '#74B9FF' },
  { id: 'elderly',   label: 'Elderly Care',   icon: '👴', color: '#55EFC4' },
]

// ch: 'wa' | 'dash' | 'app'
const PATHWAYS = {
  gp: [
    { ch:'wa',   title:'Book Appointment',  desc:'Patient messages bot to pick doctor, date & time' },
    { ch:'wa',   title:'Registration',      desc:'NRIC verified, slot confirmed via WhatsApp' },
    { ch:'dash', title:'Doctor Consult',    desc:'GP reviews notes and conducts the consultation' },
    { ch:'dash', title:'MC / Referral',     desc:'PDF-locked MC or referral letter issued instantly' },
    { ch:'wa',   title:'Automated Follow-up',desc:'24-hr recovery check-in triggered post-visit' },
  ],
  physio: [
    { ch:'wa',   title:'Book Session',      desc:'Book in-clinic or home visit via WhatsApp' },
    { ch:'wa',   title:'Intake Assessment', desc:'Digital intake form completed via chat' },
    { ch:'dash', title:'Physio Session',    desc:'Therapist logs treatment notes and exercises' },
    { ch:'dash', title:'Progress Report',   desc:'Session summary and home exercises shared' },
    { ch:'wa',   title:'Recovery Check',    desc:'Automated follow-up and next session reminder' },
  ],
  chiro: [
    { ch:'wa',   title:'Book Adjustment',   desc:'Patient books preferred chiropractor via WhatsApp' },
    { ch:'wa',   title:'Health History',    desc:'Digital health history completed via chat' },
    { ch:'dash', title:'Chiro Session',     desc:'Chiropractor conducts adjustment and logs notes' },
    { ch:'dash', title:'Treatment Plan',    desc:'Personalised care plan and X-ray results shared' },
    { ch:'wa',   title:'Recall Reminder',   desc:'Automated recall at scheduled interval' },
  ],
  dental: [
    { ch:'wa',   title:'Book Check-up',     desc:'Patient selects dentist and treatment type' },
    { ch:'wa',   title:'Patient Intake',    desc:'Dental history form sent and filled via chat' },
    { ch:'dash', title:'Dental Consult',    desc:'Dentist conducts examination or procedure' },
    { ch:'dash', title:'Invoice & Report',  desc:'PDF invoice and treatment summary sent' },
    { ch:'wa',   title:'Check-up Reminder', desc:'6-month automated recall reminder' },
  ],
  aesthetic: [
    { ch:'wa',   title:'Book Treatment',    desc:'Client books preferred treatment and slot' },
    { ch:'wa',   title:'Pre-Consult',       desc:'Aesthetic goals and contraindications captured' },
    { ch:'dash', title:'Treatment Session', desc:'Practitioner logs procedure and product details' },
    { ch:'dash', title:'Post-Care Report',  desc:'After-care instructions sent via WhatsApp' },
    { ch:'wa',   title:'Review Follow-up',  desc:'Satisfaction check and next visit reminder' },
  ],
  ambulance: [
    { ch:'wa',  title:'Emergency Request',  desc:'Patient messages "Emergency" on WhatsApp' },
    { ch:'wa',  title:'GPS Location Share', desc:'Bot prompts patient to share live location' },
    { ch:'app', title:'Crew Dispatch',      desc:'Nearest crew assigned with GPS route in 10 sec' },
    { ch:'app', title:'En Route Update',    desc:'Patient receives live ETA and crew details' },
    { ch:'dash',title:'Hospital Handover',  desc:'Trip report sent to receiving hospital' },
  ],
  tcm: [
    { ch:'wa',   title:'Book Consultation', desc:'Patient books TCM practitioner via bot' },
    { ch:'wa',   title:'Health Intake',     desc:'Constitutional questionnaire via WhatsApp chat' },
    { ch:'dash', title:'Practitioner Consult',desc:'Practitioner conducts session and logs notes' },
    { ch:'dash', title:'Prescription Share',desc:'Herbal prescription and plan sent via WhatsApp' },
    { ch:'wa',   title:'Wellness Follow-up',desc:'Automated check-in and herb refill reminder' },
  ],
  rehab: [
    { ch:'wa',   title:'Enrolment',         desc:'Patient or family registers via WhatsApp' },
    { ch:'wa',   title:'Needs Assessment',  desc:'Goals and physical assessment captured digitally' },
    { ch:'dash', title:'Rehab Session',     desc:'Therapist logs session activities and response' },
    { ch:'dash', title:'Milestone Report',  desc:'Progress milestone shared with patient & family' },
    { ch:'wa',   title:'Ongoing Check-in',  desc:'Scheduled wellness and progress check' },
  ],
  dialysis: [
    { ch:'wa',   title:'Session Scheduling',desc:'Recurring sessions auto-scheduled via WhatsApp' },
    { ch:'wa',   title:'Session Reminder',  desc:'24-hr and 1-hr reminders with prep instructions' },
    { ch:'dash', title:'Dialysis Session',  desc:'Nurse logs vitals, duration, and session notes' },
    { ch:'dash', title:'Session Report',    desc:'Post-session summary and next appointment set' },
    { ch:'wa',   title:'Medication Alert',  desc:'Daily medication and fluid restriction reminders' },
  ],
  elderly: [
    { ch:'wa',   title:'Family Enrolment',  desc:'Family registers elderly relative via WhatsApp' },
    { ch:'dash', title:'Care Plan Setup',   desc:'Medical history and care preferences configured' },
    { ch:'wa',   title:'Daily Wellness Check',desc:'Automated daily check-in sent to resident' },
    { ch:'dash', title:'Alert & Escalation',desc:'Missed check-in triggers alert to care team' },
    { ch:'wa',   title:'Family Update',     desc:'Weekly wellness summary sent to family' },
  ],
}

// Channel badge configs
const CH = {
  wa:   { label: 'WhatsApp', color: '#25D366', bg: 'rgba(37,211,102,0.12)', border: 'rgba(37,211,102,0.3)' },
  dash: { label: 'Dashboard', color: '#74B9FF', bg: 'rgba(116,185,255,0.12)', border: 'rgba(116,185,255,0.3)' },
  app:  { label: 'Crew App',  color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.3)' },
}

// ── Network background nodes (x%, y%) and connection pairs ───────
const NET_NODES = [
  [4,12],[14,6],[26,3],[38,10],[52,5],[66,2],[78,8],[88,15],[96,6],
  [2,28],[10,38],[20,25],[30,35],[42,22],[55,28],[68,18],[80,30],[94,22],
  [6,52],[15,60],[28,55],[40,68],[50,48],[62,58],[74,50],[85,62],[97,45],
  [3,75],[12,82],[22,72],[35,88],[48,78],[60,85],[72,75],[83,88],[94,72],
  [8,95],[20,98],[35,92],[52,96],[67,90],[80,96],[92,88],
]
const NET_EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],
  [0,9],[1,11],[3,13],[5,14],[6,15],[7,16],[8,17],
  [9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],
  [9,18],[10,19],[12,20],[13,21],[14,22],[15,23],[16,24],[17,25],
  [18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],
  [18,27],[19,28],[21,29],[22,30],[23,31],[24,32],[25,33],[26,34],
  [27,28],[28,29],[29,30],[30,31],[31,32],[32,33],[33,34],
  [27,35],[29,36],[31,37],[33,38],[34,39],
  [35,36],[36,37],[37,38],[38,39],[39,40],[40,41],[41,42],
]

function NetworkBg() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none' }}
    >
      {NET_EDGES.map(([a,b],i) => {
        const [x1,y1] = NET_NODES[a] || [0,0]
        const [x2,y2] = NET_NODES[b] || [0,0]
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(91,174,140,0.12)" strokeWidth="0.15"/>
      })}
      {NET_NODES.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="0.5" fill="rgba(91,174,140,0.25)"/>
      ))}
    </svg>
  )
}

function ChannelBadge({ ch }) {
  const c = CH[ch]
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:'4px',
      background: c.bg, border:`1px solid ${c.border}`, borderRadius:'9999px',
      padding:'0.2rem 0.55rem',
      fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:'0.6rem',
      color: c.color, letterSpacing:'0.04em', textTransform:'uppercase',
      flexShrink:0,
    }}>
      {ch === 'wa'   && <svg width="8" height="8" viewBox="0 0 24 24" fill={c.color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.667 8.667 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.463 3.48 11.815 11.815 0 0 0 12.05 0z"/></svg>}
      {ch === 'dash' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>}
      {ch === 'app'  && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
      {c.label}
    </span>
  )
}

export default function Ecosystem() {
  const sectionRef = useRef(null)
  const [visible, setVisible]     = useState(false)
  const [selected, setSelected]   = useState('gp')
  const [animating, setAnimating] = useState(false)
  const [shown, setShown]         = useState('gp') // what's actually rendered

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Fade out → swap content → fade in when provider changes
  function selectProvider(id) {
    if (id === selected || animating) return
    setSelected(id)
    setAnimating(true)
    setTimeout(() => {
      setShown(id)
      setAnimating(false)
    }, 220)
  }

  const prov    = PROVIDERS.find(p => p.id === shown)
  const steps   = PATHWAYS[shown] || []

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(160deg,#08112e 0%,#0D1B4B 50%,#091230 100%)',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '4.5rem 1.5rem 4rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes ecoHubRing {
          0%   { transform:translate(-50%,-50%) scale(1);   opacity:0.4; }
          100% { transform:translate(-50%,-50%) scale(2.2); opacity:0; }
        }
        @keyframes ecoHubIn {
          from { opacity:0; transform:scale(0.8); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes ecoStepIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .eco-hub-wrap.visible { animation: ecoHubIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .eco-step { animation: ecoStepIn 0.4s ease forwards; }
        .eco-pill-btn {
          border-radius: 9999px;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.78rem;
          padding: 0.45rem 0.9rem;
          cursor: pointer;
          display: flex; align-items: center; gap: 0.4rem;
          transition: border-color 0.2s ease, background 0.2s ease,
                      color 0.2s ease, box-shadow 0.2s ease,
                      transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .eco-pill-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          transform: scale(1.04);
        }
        .eco-pill-btn.active {
          color: #fff;
          transform: scale(1.06);
        }
      `}</style>

      {/* Network background */}
      <div style={{ position:'absolute',inset:0,opacity: visible ? 1 : 0, transition:'opacity 1.2s ease' }}>
        <NetworkBg />
      </div>

      {/* Radial glow at center */}
      <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'60vw',height:'60vw',maxWidth:'700px',maxHeight:'700px',borderRadius:'50%',background:'radial-gradient(circle,rgba(91,174,140,0.07) 0%,transparent 65%)',pointerEvents:'none' }} />

      {/* ── AnyHealth Hub ── */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:2, marginBottom:'2.5rem' }}>
        <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'0.5rem' }}>
          {/* Pulse rings */}
          {visible && [0,1].map(i => (
            <div key={i} style={{
              position:'absolute',
              width:'128px', height:'128px',
              borderRadius:'50%',
              border:'1.5px solid rgba(91,174,140,0.3)',
              animation:`ecoHubRing 2.6s ease-out ${i * 1.3}s infinite`,
              transform:'translate(-50%,-50%)',
              left:'50%', top:'50%',
              pointerEvents:'none',
            }} />
          ))}
          {/* Hub circle */}
          <div
            className={`eco-hub-wrap${visible ? ' visible' : ''}`}
            style={{
              width:'108px', height:'108px', borderRadius:'50%',
              background:'linear-gradient(135deg,#1a3a2a,#2D5A3D)',
              border:'2px solid rgba(91,174,140,0.5)',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:'4px',
              boxShadow:'0 0 48px rgba(91,174,140,0.2), 0 0 96px rgba(91,174,140,0.08)',
              opacity:0, position:'relative', zIndex:1,
            }}
          >
            <img src={logo} alt="AnyHealth" style={{ width:'52px', filter:'brightness(0) invert(1)' }} />
          </div>
        </div>

        {/* AnyHealth name */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
          textAlign:'center',
        }}>
          <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:900,color:'#fff',fontSize:'clamp(1.6rem,3.5vw,2.5rem)',letterSpacing:'-0.03em',lineHeight:1 }}>
            AnyHealth
          </div>
          <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.8rem',color:'rgba(255,255,255,0.35)',marginTop:'0.3rem',letterSpacing:'0.06em',textTransform:'uppercase',fontWeight:500 }}>
            The WhatsApp-Powered Healthcare Network
          </div>
        </div>
      </div>

      {/* ── Provider Selector ── */}
      <div style={{
        position:'relative', zIndex:2,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
        marginBottom:'2rem',
      }}>
        <div style={{ textAlign:'center', marginBottom:'0.875rem' }}>
          <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'rgba(255,255,255,0.35)',fontSize:'0.68rem',letterSpacing:'0.1em',textTransform:'uppercase' }}>
            Select Provider
          </span>
        </div>
        <div style={{
          display:'flex', flexWrap:'wrap', justifyContent:'center',
          gap:'0.5rem', maxWidth:'800px', margin:'0 auto', padding:'0 0.5rem',
        }}>
          {PROVIDERS.map(p => (
            <button
              key={p.id}
              className={`eco-pill-btn${selected === p.id ? ' active' : ''}`}
              onClick={() => selectProvider(p.id)}
              style={{
                borderColor: selected === p.id ? p.color : undefined,
                background:  selected === p.id ? `${p.color}18` : undefined,
                color:       selected === p.id ? p.color : undefined,
                boxShadow:   selected === p.id ? `0 0 16px ${p.color}33` : undefined,
              }}
            >
              <span style={{ fontSize:'0.95rem' }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Patient Care Pathway ── */}
      <div style={{
        position:'relative', zIndex:2,
        maxWidth:'1000px', margin:'0 auto', width:'100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s',
      }}>
        {/* Dashed pathway box */}
        <div style={{
          border:'1.5px dashed rgba(255,255,255,0.15)',
          borderRadius:'20px',
          padding:'1.5rem 1.25rem 1.25rem',
          position:'relative',
          background:'rgba(0,0,0,0.2)',
          backdropFilter:'blur(8px)',
        }}>
          {/* Label top-left */}
          <div style={{
            position:'absolute', top:'-11px', left:'1.25rem',
            background:'#091230', padding:'0 0.6rem',
            fontFamily:"'Poppins',sans-serif", fontWeight:700,
            color:'rgba(255,255,255,0.3)', fontSize:'0.65rem',
            letterSpacing:'0.1em', textTransform:'uppercase',
          }}>
            patient care pathway
          </div>

          {/* Provider label + color accent */}
          <div style={{
            display:'flex', alignItems:'center', gap:'0.6rem',
            marginBottom:'1.1rem',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(-4px)' : 'none',
            transition:'opacity 0.2s ease, transform 0.2s ease',
          }}>
            <span style={{ fontSize:'1.1rem' }}>{prov.icon}</span>
            <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:prov.color,fontSize:'0.9rem' }}>{prov.label}</span>
            <div style={{ flex:1, height:'1px', background:`linear-gradient(to right,${prov.color}44,transparent)` }} />
          </div>

          {/* Steps */}
          <div
            key={shown}
            style={{
              display:'grid',
              gridTemplateColumns:'repeat(5,1fr)',
              gap:'4px',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(8px)' : 'none',
              transition:'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            {steps.map((step, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center' }}>
                <div
                  className="eco-step"
                  style={{
                    flex:1,
                    background:'rgba(255,255,255,0.04)',
                    border:`1px solid rgba(255,255,255,0.07)`,
                    borderRadius:'12px',
                    padding:'0.875rem 0.7rem',
                    display:'flex', flexDirection:'column', gap:'0.5rem',
                    animationDelay:`${i * 0.06}s`,
                  }}
                >
                  {/* Channel badge */}
                  <ChannelBadge ch={step.ch} />

                  {/* Step number + title */}
                  <div style={{ display:'flex', alignItems:'flex-start', gap:'0.4rem', marginTop:'0.15rem' }}>
                    <span style={{
                      background: prov.color,
                      color:'#fff',
                      fontFamily:"'Poppins',sans-serif", fontWeight:900,
                      fontSize:'0.6rem',
                      width:'16px', height:'16px', borderRadius:'50%',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, marginTop:'1px',
                    }}>{i + 1}</span>
                    <span style={{
                      fontFamily:"'Poppins',sans-serif", fontWeight:700, color:'#fff',
                      fontSize:'0.72rem', lineHeight:1.3,
                    }}>{step.title}</span>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily:"'Inter',sans-serif",
                    fontSize:'0.67rem', color:'rgba(255,255,255,0.38)',
                    lineHeight:1.55, margin:0,
                  }}>{step.desc}</p>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div style={{ padding:'0 3px', flexShrink:0 }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12" style={{ opacity:0.3 }}>
                      <path d="M4 2l4 4-4 4" stroke={prov.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
