import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/brand assets/3.png'

const links = [
  { label: 'Services', target: 'services' },
  { label: 'Features', target: 'features' },
  { label: 'Pricing', target: 'pricing' },
  { label: 'About', target: 'about' },
  { label: 'Contact', target: 'contact' },
]

function scrollToSection(id) {
  const container = document.querySelector('.snap-main')
  const el = document.getElementById(id)
  if (container && el) {
    container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.snap-main')
    const target = container || window
    const handler = () => {
      const scrollY = container ? container.scrollTop : window.scrollY
      setScrolled(scrollY > 60)
    }
    target.addEventListener('scroll', handler, { passive: true })
    return () => target.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ padding: scrolled ? '12px 24px' : '20px 24px', transition: 'padding 0.4s cubic-bezier(0.4,0,0.2,1)', pointerEvents: 'none' }}>
      <nav
        style={{
          background: scrolled ? 'rgba(13,27,75,0.98)' : 'rgba(13,27,75,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '9999px',
          border: scrolled ? '1px solid rgba(91,174,140,0.18)' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(13,27,75,0.35), 0 2px 8px rgba(0,0,0,0.2)'
            : '0 4px 24px rgba(13,27,75,0.15)',
          padding: '0.55rem 0.55rem 0.55rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          maxWidth: '900px',
          width: '100%',
          transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
        >
          <img src={logo} alt="AnyHealth" style={{ height: '32px' }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.9rem', letterSpacing: '-0.01em' }}>AnyHealth</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6" style={{ flex: 1, justifyContent: 'center' }}>
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => scrollToSection(l.target)}
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              {l.label}
            </button>
          ))}
          <Link to="/blog" className="nav-link" style={{ fontSize: '0.82rem' }}>Blog</Link>
        </div>

        {/* CTA */}
        <a
          href="https://calendly.com/anyhealth-sg/30min"
          target="_blank"
          rel="noreferrer"
          style={{
            background: '#5BAE8C',
            color: '#fff',
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 700,
            borderRadius: '9999px',
            padding: '0.6rem 1.4rem',
            fontSize: '0.8rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(91,174,140,0.4)',
            transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4A9960'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(91,174,140,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#5BAE8C'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(91,174,140,0.4)' }}
        >
          Book a Demo
        </a>
      </nav>
    </div>
  )
}
